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

            // go to the Sales Monitoring Exercises application and wait for the 'Login' screen to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/`);
            let selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}01`, 'At the login screen');

            // login and wait for the 'Dashboard' screen to fully render
            selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.click(selector);
            selector = 'a#wt20_OutSystemsUIWeb_wt9_block_wtHeader_wtRight_wt5_OutSystemsUIWeb_wt3_block_wtContent_wt4';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}02`, 'At the dashboard screen');

            // go to the 'Contact List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Contact_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt14_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}03`, 'At the contact list screen');

            // go to the 'Company List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Company_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt59_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}04`, 'At the company list screen');

            // go to the 'Opportunity List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Opportunity_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt61_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}05`, 'At the opportunity list screen');

            // go to the 'History' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Company_FullHistory.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt52_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}06`, 'At the history screen');

            // go to the 'Quarter Quotas' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/AccountManager_SetupQuotas.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt19_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}07`, 'At the quarter quotas screen');

            // go to the 'Closed Opportunities' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Opportunities_ListClosed.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt16_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}08`, 'At the closed opportunities screen');

            // go to the 'Dashboard' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales_for_monit_exercises1/Dashboard.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt20_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}09`, 'At the dashboard screen');

            // click the logout link
            selector = 'a#wt20_OutSystemsUIWeb_wt9_block_wtHeader_wtRight_wt5_OutSystemsUIWeb_wt3_block_wtContent_wt4';
            await page.click(selector);
            selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.waitForSelector(selector);
            await logger.log(page, 'Sales Monitoring Exercises', `${step}10`, 'Logged out');

            for (let loginStep = 0; loginStep < 5; loginStep++) {
                // first, a small trick to make sure we select any existing text in the username input field to replace it by the new content next
                selector = 'input#OutSystemsUIWeb_wt13_block_wtLogin_OutSystemsUIWeb_wt21_block_wtLogin_OutSystemsUIWeb_wt22_block_wtInput_wtUserNameInput';
                await page.click(selector, { clickCount: 3 });
                // type some bogus username
                selector = 'input#OutSystemsUIWeb_wt13_block_wtLogin_OutSystemsUIWeb_wt21_block_wtLogin_OutSystemsUIWeb_wt22_block_wtInput_wtUserNameInput';
                await page.type(selector, 'some-user@some-mail.com');
                // type some bogus password
                selector = 'input#OutSystemsUIWeb_wt13_block_wtLogin_OutSystemsUIWeb_wt21_block_wtLogin_OutSystemsUIWeb_wt30_block_wtInput_wt15';
                await page.type(selector, 'somepassword');
                // click the login button and wait for the response screen (failed login)
                selector = 'input#OutSystemsUIWeb_wt13_block_wtLogin_OutSystemsUIWeb_wt21_block_wtLogin_wt31';
                await page.click(selector);
                selector = 'span#OutSystemsUIWeb_wt13_block_wt4_RichWidgets_wt7_block_wtnotify';
                await page.waitForSelector(selector);
                await logger.log(page, 'Sales Monitoring Exercises', `${step}${loginStep}11`, 'Failed login attempt');
            }
        } catch (error) {
            // catch and handle any unexpected error
            console.error(error);
        } finally {
            // always close the browser no matter what to avoid memory leaks
            await browser.close();
        }
    }
}
