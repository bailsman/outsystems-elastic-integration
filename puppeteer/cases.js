const puppeteer = require('puppeteer');
const logger = require('./logger.js')

module.exports = {
    run: async function (domain, step) {
        // create the browser
        const browser = await puppeteer.launch();
        try {
            // create a new page (tab) in the browser
            const page = await browser.newPage();

            // set the viewport dimensions for the page
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1
            });

            // go to the Cases application and wait for the 'Login' screen to fully render
            await page.goto(`https://${domain}/Cases/`);
            let selector = 'div#OutSystemsUIWeb_wt5_block_wtLogin_OutSystemsUIWeb_wt34_block_wtLogin';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}01`, 'At the login screen');

            // login and wait for the 'Dashboard' screen to fully render
            selector = 'a#OutSystemsUIWeb_wt5_block_wtLogin_OutSystemsUIWeb_wt10_block_wtContent_wt31_wtListRecordsSalesManagers_ctl00_wt18';
            await page.waitForSelector(selector);
            await page.click(selector);
            selector = 'input#wt8_OutSystemsUIWeb_wt5_block_wtContent_wtActions_wt47';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}02`, 'At the dashboard screen');

            // create a new case
            await page.click(selector);
            selector = 'input#wt22_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt13_block_wtContent_wtContact_Name';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}03`, 'Create new case');
            await page.type(selector, 'Daniel Tonini');
            selector = 'input#wt22_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt13_block_wtContent_wtCase_Subject';
            await page.type(selector, 'Some Subject');
            selector = 'textarea#wt22_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt13_block_wtContent_wtCase_Description';
            await page.type(selector, 'Some Description');
            selector = 'select#wt22_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt13_block_wtContent_wtCase_TypeId';
            await page.select(selector, '2');
            selector = 'input#wt22_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt13_block_wtContent_wt36';
            await page.click(selector);
            selector = 'div#wt52_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt63_wtTableRecords';
            await page.waitForSelector(selector);
            await logger.log(page,'Cases', `${step}04`, 'Created new case');

            // go to the 'New Cases' screen and wait for it to fully render
            await page.goto(`https://${domain}/Cases/Case_List.aspx?StatusId=4&(Not.Licensed.For.Production)=`);
            selector = 'div#wt37_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.log(page,'Cases', `${step}05`, 'At the new cases screen');

            // select the newly created case
            let linkHandlers = await page.$x("//a[contains(text(), 'Some Subject')]");
            await linkHandlers[0].click();
            selector = 'div#wt52_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt63_wtTableRecords';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}06`, 'Selected the newly created case');
            // press the 'Save' button
            selector = 'input#wt52_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt62_block_wtContent_wt15';
            await page.click(selector);
            selector = 'div#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}07`, 'Changed status to working case');

            // go to the 'Working Cases' screen and wait for it to fully render
            await page.goto(`https://${domain}/Cases/Case_List.aspx?StatusId=1&(Not.Licensed.For.Production)=`);
            selector = 'div#wt37_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtCaseTable_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}08`, 'At the working cases screen');

            // select the newly created case
            linkHandlers = await page.$x("//a[contains(text(), 'Some Subject')]");
            await linkHandlers[0].click();
            selector = 'div#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}09`, 'Selected the newly created case');
            // press the 'Pick this case' button
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtPickButton';
            await page.click(selector);
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtWaitingButton';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}10`, 'Picked the case');
            // enter a comment
            selector = 'textarea#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wtinputNote';
            await page.type(selector, 'Some Comment');
            // press the 'Add Comment' button
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wt10';
            await page.click(selector);
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtWaitingButton';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}11`, 'Added a comment');
            // enter another comment
            selector = 'textarea#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wtinputNote';
            await page.type(selector, 'Some Call');
            // press the 'Register Call' button
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wt11';
            await page.click(selector);
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtWaitingButton';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}12`, 'Registered a call');
            // press the 'Waiting for Customer' button
            await page.click(selector);
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtWorkingButton';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}13`, 'Changed status to waiting');
            // press the 'Set as Working' button
            await page.click(selector);
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wtCloseCaseButton';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}14`, 'Changed status to working');
            // press the 'Close Case' button
            await page.click(selector);
            // enter a comment
            selector = 'textarea#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wtinputNote';
            await page.type(selector, 'Some Note');
            // press the 'Close Case' button again
            selector = 'input#wt31_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wt90_OutSystemsUIWeb_wt14_block_wtContent_wtCloseCaseButton';
            await page.click(selector);
            selector = 'div#wt37_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtCaseTable_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}15`, 'Closed the case');

            // go to the 'Waiting Cases' screen and wait for it to fully render
            await page.goto(`https://${domain}/Cases/Case_List.aspx?StatusId=2&(Not.Licensed.For.Production)=`);
            selector = 'div#wt37_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_wtCaseTable_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}16`, 'At the waiting cases screen');

            // go to the 'FAQs' screen and wait for it to fully render
            await page.goto(`https://${domain}/Cases/FAQ_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt4_OutSystemsUIWeb_wt5_block_wtContent_wtMainContent_OutSystemsUIWeb_wt32_block_wtContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}17`, 'At the FAQ screen');

            // logout
            // go to the 'Dashboard' screen and wait for it to fully render
            await page.goto(`https://${domain}/Cases/Dashboard.aspx?(Not.Licensed.For.Production)=)=`);
            selector = 'a#wt8_OutSystemsUIWeb_wt5_block_wtHeader_wtRight_wt22_OutSystemsUIWeb_wt16_block_wtContent_wt14';
            await page.waitForSelector(selector);
            // click the logout link
            await page.click(selector);
            selector = 'div#OutSystemsUIWeb_wt5_block_wtLogin_OutSystemsUIWeb_wt34_block_wtLogin';
            await page.waitForSelector(selector);
            await logger.log(page, 'Cases', `${step}18`, 'Logged out');
        } catch (error) {
            // catch and handle any unexpected error
            console.error(error);
        } finally {
            // always close the browser no matter what to avoid memory leaks
            await browser.close();
        }
    }
}
