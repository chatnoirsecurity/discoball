discoball
=================

A somewhat janky if working node script to scrape discord and take screenshots.

Node versions
----------------
Tried on 16.X and v17.4.0

How to use
--------------------

#. `npm install`
#. `node src/a_start.js`
#. This will start up a new instance of Chromium
#. Log into Discord and navigate to whatever channel you want to scrape
#. Scroll the chat to where you want to start
#. In a separate terminal, run `node src/b_snapshot.js`
#. The script will page down through the chat and take screenshots.

How to use on Windows
----------------------

1.  Download & install Visual Studio:
https://code.visualstudio.com/download


2.  Install Powershell

Instructions here: https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7.1

but you might just be able to download the latest here
https://github.com/PowerShell/PowerShell/releases/tag/v7.1.3

Install it, accepting defaults

3. Run powershell as administrator

4. Install git: https://desktop.github.com/

5. Install node: https://nodejs.org/en/download/

6. Download this repo from github using Github Desktop

DO NOT use the "open in vscode" thing
there is a stupid bug where it breaks everything
the bug is four years old apparently
computers were a mistake


7. Do a sanity check:

close and restart vscode
type ctrl-` to open the terminal 
type "node -v" to check if it has found node

8. Tell node to install everything it needs to run 

`npm install`

(it'll look for the package.json file and install what it needs from there)

9. Run the scripts as above.