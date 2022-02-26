const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const pauseBetweenShots = 3000; // milliseconds
const bottomPadding = 48; // this is so we don't screenshot the "you are viewing older messages" bar. FIXME: can we just hide that instead?

var screenshotNum = 361;

async function atEndOfScroll(el) {
    return el.evaluate((node) => {
        return Promise.resolve(node.scrollHeight - Math.abs(node.scrollTop) === node.clientHeight);
    })
}

(async() => {
    // read ws_url from lockfile
    const wsURL = await fs.readFile('./scraper.lock', {encoding: 'utf-8'});
    console.log("Connecting to", wsURL);
 
    const browser = await puppeteer.connect({browserWSEndpoint: wsURL, slowMo: 250});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1800, height: 800});

    // hide new message notifications and old message notification
    // for some reason it's happier if you add them one at a time
    // todo fix this
    await page.addStyleTag({content: "div[class^=newMessagesBar-] { display:none};"});
    await page.addStyleTag({content: "div[class^=jumpToPresentBar-] { display:none};"});

    const scrollBox = await page.waitForSelector('main div[class^=scroller-]', {visible: true});

    const boundingBox = await scrollBox.boundingBox();
    let screenshotHeight = boundingBox.height - bottomPadding; 
    let isAtEnd = false;
    
    do {
        isAtEnd = await atEndOfScroll(scrollBox);

        if (isAtEnd) {
            screenshotHeight += bottomPadding;
        }

        console.log("taking screenshot no", screenshotNum);

        await page.screenshot({
            path: `screenshots/${screenshotNum.toString().padStart(4, '0')}.png`,
            clip: {
                x: boundingBox.x,
                y: boundingBox.y,
                width: boundingBox.width,
                height: screenshotHeight,
            },
            captureBeyondViewport: false,
        });

        screenshotNum++;

        await scrollBox.evaluate((node, scrollBy) => {
            node.scrollBy({top: scrollBy});
        }, screenshotHeight)

        await page.waitForTimeout(pauseBetweenShots);

    } while (!isAtEnd);
    

    await browser.disconnect();
  

})();