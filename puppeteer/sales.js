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

            // go to the Sales application and wait for the 'Login' screen to fully render
            await page.goto(`https://${domain}/Sales/`);
            let selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}01`, 'At the login screen');

            // login and wait for the 'Dashboard' screen to fully render
            selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.click(selector);
            selector = 'a#wt20_OutSystemsUIWeb_wt9_block_wtHeader_wtRight_wt5_OutSystemsUIWeb_wt3_block_wtContent_wt4';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}02`, 'At the dashboard screen');

            // go to the 'Contact List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Contact_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt14_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}03`, 'At the contact list screen');

            // go to the 'Company List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Company_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt59_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}04`, 'At the company list screen');

            // go to the 'Opportunity List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Opportunity_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt61_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}05`, 'At the opportunity list screen');

            // go to the 'History' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Company_FullHistory.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt52_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}06`, 'At the history screen');

            // go to the 'Quarter Quotas' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/AccountManager_SetupQuotas.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt19_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}07`, 'At the quarter quotas screen');

            // go to the 'Closed Opportunities' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Opportunities_ListClosed.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt16_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}08`, 'At the closed opportunities screen');

            // go to the 'Dashboard' screen and wait for it to fully render
            await page.goto(`https://${domain}/Sales/Dashboard.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt20_OutSystemsUIWeb_wt9_block_wtContent_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}09`, 'At the dashboard screen');

            // click the logout link
            selector = 'a#wt20_OutSystemsUIWeb_wt9_block_wtHeader_wtRight_wt5_OutSystemsUIWeb_wt3_block_wtContent_wt4';
            await page.click(selector);
            selector = 'a#OutSystemsUIWeb_wt13_block_wtLogin_wt8_wtListRecordsSalesManagers_ctl00_wt29';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Sales', `${step}10`, 'Logged out');
        } catch (error) {
            // catch and handle any unexpected error
            logger.error(error);
        } finally {
            // always close the browser no matter what to avoid memory leaks
            await browser.close();
        }
    }
}
