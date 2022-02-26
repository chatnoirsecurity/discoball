const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const LOGIN_URL = 'https://discord.com/login';


(async() => {
    const browser = await puppeteer.launch({headless: false});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1200, height: 600});

    console.log("chromium started, ws url is", browser.wsEndpoint());
    console.log("don't close this window or stop this script, chromium will quit")

    await fs.writeFile('./scraper.lock', browser.wsEndpoint(), (err) => {
        if (err) throw err;
      });

    await page.goto(LOGIN_URL);

})();



