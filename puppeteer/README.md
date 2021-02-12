# Generate traffic with Puppeteer

## About

This folder contains a [Node.js](https://nodejs.org/) application that makes use of [Puppeteer](https://developers.google.com/web/tools/puppeteer) to generate traffic on a few well-known applications.

Puppeteer is a Node.js library which provides a high-level Javascript API to control headless Chrome or Chromium over the DevTools Protocol.

The goal of this application is to mimic a human user, using a set of well-known OutSystems applications in the browser.
By doing that, we'll be generating traffic on those applications, and therefore also generating monitoring data to help on the delivery of monitoring services.

Puppeteer lets us do this through the use of a [headless browser](https://developers.google.com/web/updates/2017/04/headless-chrome), meaning this application can run on any kind of platform, even a Linux server with no desktop client.
The browser never shows up. Everything happens with no visible action to the human eye.

## Structure

This application has a few Node.js scripts. It has a script for each of the well-known OutSystems applications we want to use: `cases.js`, `directory.js`, `sales.js` and `sales-for-monitoring.js`. These mimic the user interacting with those applications, and the `run.js` script is the main one, that bootstraps and orchestrates all the others.

## Pre-requisite

As already mentioned, this application can run on any platform.

The only pre-requisite is to have Node.js (and NPM) installed.

Don't forget you'll have to clone this repository, or at least download the contents of this folder.

Because this application runs as a command, open your command prompt and move into your local folder with these contents.

If you don't want to run this locally on your machine, check [here](#setup-a-linux-vm-on-azure-from-scratch) how to setup a Linux VM on Azure from scratch and run it from there.

After installing Node.js, prepare the application to run with the following command:
```
npm install
```

## Run

Run the application with the following command:
```
node run.js --domain outsystems-dev6.outsystemsenterprise.com --iterations 2 --pause 5 --debug
```

Details about the options:
* `--domain`: This options indicates the OutSystems domain where we want to use the well-known applications. If you don't specify this option, a default value will be used. Default value is `outsystems-dev6.outsystemsenterprise.com`.
* `--iterations`: This option indicates the number of iterations that will be executed through the well-known applications. If you don't specify this option, it will iterate forever.
* `--pause`: This option indicates the number of seconds it will pause before running the next iteration. If you don't specify this option, a default value will be used. Default value is `5 seconds`.
* `--debug`: This option indicates the level of debug information it will print to the console output. If you don't specify this option, it will print no debug information. Possible values are:
    * `--debug`: It will print what is doing and in which step it is.
    * `--trace`: Besides what is mentioned above, it will also take screenshots (PNG image files) of each page it passes through.

> The command above will run through the well-known applications twice, on domain `outsystems-dev6.outsystemsenterprise.com`, will pause for 5 seconds between each run and will print debug information to the console output.

## Stop

To stop the application from running, just hit `CTRL-C`.

> Make sure to wait for a pause before you abort execution just to guarantee no information is left hanging in the well-known applications.

> You can also let it go through all iterations, and it will stop gracefully at the end.

## Setup a Linux VM on Azure from scratch

> :exclamation: This application is already deployed and running in a forever loop on server `52.157.174.184`. You can connect to this server with the command `ssh devops@52.157.174.184` and password `Outsystems!123`. If you are interested in deploying a new version of the application in this VM, you can start from step 5.

If you want to setup a Linux VM on Azure from scratch and leave it there running forever, these are the steps you need to take:

1. Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
2. Run the following command to login into your Azure account:
    ```
    az login
    ```
3. Run the following command to create a new Resource Group called `puppeteer` (you can name it whatever you want):
    ```
    az group create --name "puppeteer" --location "West Europe"
    ```
4. Run the following command to create and deploy a Linux VM called `puppeteerVM` (you can call it whatever you want) in the newly created resource group:
    ```
    az vm create --resource-group "puppeteer" --name "puppeteerVM" --image "UbuntuLTS" --admin-username "outsystems" --admin-password "Outsystems123\!"
    ```
    As a result of this command, you will get something similar to this:
    ```
    {
      "fqdns": "",
      "id": "/subscriptions/f95eb7fa-bb31-4eb9-8a1e-5227ade75f6a/resourceGroups/ds_test/providers/Microsoft.Compute/virtualMachines/autoVM",
      "location": "westeurope",
      "macAddress": "00-0D-3A-49-65-97",
      "powerState": "VM running",
      "privateIpAddress": "10.0.0.4",
      "publicIpAddress": "104.45.42.22",
      "resourceGroup": "ds_test",
      "zones": ""
    }
    ```
    Take note of the `publicIpAddress` because you'll need it to connect to the newly created VM.
5. Run the following command to pack the application (the contents of this folder):
    ```
    npm pack
    ```
    As a result of this command, you will get a tarball file called `puppeteer-1.0.0.tgz` with the contents of this folder.
6. Run the following command to transfer the tarball file to the newly created VM:
    ```
    scp puppeteer-1.0.0.tgz outsystems@104.45.42.22:/home/outsystems/puppeteer-1.0.0.tgz
    ```
    > :exclamation: Beware that you need to replace the IP address with the one you got from creating the VM.
    
    > Password is `Outsystems123!`.
7. Run the following command to connect to the newly created VM:
    ```
    ssh outsystems@104.45.42.22
    ```
    > :exclamation: Beware that you need to replace the IP address with the one you got from creating the VM.
    
    > Password is `Outsystems123!`.

    > :exclamation: Beware that you are now inside the newly created VM.
8. Run the following commands to install Node.js in the newly created VM:
    ```
    sudo apt-get update
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
9. Run the following command to install necessary system dependencies:
    ```
    sudo apt-get install libnss3 libasound2 libatk-bridge2.0-0 libgtk-3-0 libgbm-dev fonts-liberation lsb-release xdg-utils
    ```
10. Run the following command to unpack the application:
    ```
    tar -vxf puppeteer-1.0.0.tgz
    ```
11. Run the following command to place yourself into de application folder:
    ```
    cd package/
    ```
12. Run the following command to install application dependencies:
    ```
    npm install
    ```
13. Run the following command to start the application and leave it running in the background:
    ```
    node run.js --domain outsystems-dev6.outsystemsenterprise.com --iterations 2 --pause 5 --debug > /dev/null 2>&1 &
    ```
    > `> /dev/null 2>&1` means redirect `stdout` to nowhere and `stderr` to `stdout`.
14. Run the following command to look at the logs of the application running in the background:
    ```
    tail -f run.log
    ```
    > To exit the tail, just hit `CTRL-C`.
15. Run the following command to stop the application running in the background:
    ```
    kill -9 $(ps aux | grep '[r]un.js' | awk '{print $2}')
    ```
    > Make sure to wait for a pause before you abort execution just to guarantee no information is left hanging in the well-known applications.
    
    > `ps aux` gives you the list of all the processes.

    > `grep` filters that based on your search string, `[r]` is a trick to stop you picking up the actual grep process itself.

    > `awk` just gives you the second field of each line, which is the `PID`.

    > The `$(x)` construct means to execute `x` then take its output and put it on the command line. The output of that `ps` pipeline inside the construct above is the list of process IDs, so you end up with a command like `kill 1234 1122 7654`.
16. Run the following command to delete the Azure resource group and everything in it:
    ```
    az group delete --name "puppeteer"
    ```

## Future improvements

To add traffic generation for a new well-known application, follow these steps:

1. Create a new Javascript file by copying `cases.js`.
2. Reference it and use it in the `run.js` file, just like the other ones are.
3. Use the app yourself with the Chrome Dev Tools opened and decide which pages to visit, which links and buttons to click, which forms to fill and submit, and take note of the ids of all these DOM elements.
4. Recreate those footsteps using the ids you've collected, and following what was done for the Cases application.
    > `await page.goto('https://url');` goes to given URL.

    > `let selector = 'div#idOfDiv'; await page.waitForSelector(selector);` waits for a div with the id `idOfDiv` to be present on the loaded page.

    > `selector = 'a#idOfLink'; await page.click(selector);` clicks on the link with id `idOfLink`.

    > `selector = 'input#idOfTextInput'; await page.type(selector, 'Some input text');` writes the text `Some input text` in the input text with id `idOfInputText`.

    > `selector = 'select#idOfDropdownList'; await page.select(selector, '2');` selects the option with value `2` from a dropdown list with id `idOfDropdownList`.

    > `selector = 'input#idOfButton'; await page.click(selector);` clicks on the button with id `idOfButton`.

    > `selector = 'textarea#idOfTextarea'; await page.type(selector, 'Some input text');` writes the text `Some input text` in the textarea with id `idOfTextarea`.

    > `linkHandlers = await page.$x("//a[contains(text(), 'Some text')]"); await linkHandlers[0].click();` searches the page for a link containing text `Some text` and clicks on it.

    If you want to learn more about Puppeteer for possible future improvements, besides the obvious official documentation, [here](https://returnstring.com/series/puppeteer-getting-started) is a really nice "Getting Started" series.
