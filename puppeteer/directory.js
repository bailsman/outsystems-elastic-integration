const puppeteer = require('puppeteer');
const logger = require('./logger.js')

// the id of the employee to edit
const employeeId = 2181;
// the id of the floor plan to edit
const floorPlanId = 7;

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

            // go to the Employee Directory application and wait for the 'Login' screen to fully render
            await page.goto(`https://${domain}/Directory/`);
            let selector = 'div#wt6_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}01`, 'At the login screen');

            // login and wait for the 'Employee List' screen to fully render
            selector = 'a#wt6_wtMainContent_wt14_wtListDirectoryManager_ctl00_wt11';
            await page.click(selector);
            selector = 'div#wt97_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}02`, 'At the employee list screen');

            // go to the 'Edit Employee' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/Employee_Edit.aspx?EmployeeId=${employeeId}&(Not.Licensed.For.Production)=`);
            selector = 'div#wt113_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}03`, 'At the edit employee screen');

            // go to the 'Org Chart' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/OrgChart.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt2_wtMainContent_wtListRecords_ctl00_wt11_wtChartTable_wtChart';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}04`, 'At the org chart screen');

            // go to the 'Organizations' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/Organizations_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt19_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}05`, 'At the organizations screen');

            // go to the 'Office Locations' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/OfficeLocation_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt18_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}06`, 'At the office locations screen');

            // go to the 'Job Titles' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/JobTitle_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt3_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}07`, 'At the job titles screen');

            // go to the 'Floor Plan' edit popup screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/FloorPlanEdit_Popup.aspx?PlanId=${floorPlanId}&(Not.Licensed.For.Production)=`);
            selector = 'div#RichWidgets_wt2_block_wtMainContent_wtFloorplanContainer';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}08`, 'At the floor plan edit screen');

            // go to the 'Employee List' screen and wait for it to fully render
            await page.goto(`https://${domain}/Directory/Employee_List.aspx?(Not.Licensed.For.Production)=`);
            selector = 'div#wt97_wtMainContent_wtFilters_Wrapper';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}09`, 'At the employee list screen');

            // click the logout link
            selector = 'a#wt97_wtHeader_wt346_wt12_wtLogoutLink';
            await page.click(selector);
            selector = 'div#wt6_wtMainContent';
            await page.waitForSelector(selector);
            await logger.trace(page, 'Directory', `${step}10`, 'Logged out');
        } catch (error) {
            // catch and handle any unexpected error
            logger.error(error);
        } finally {
            // always close the browser no matter what to avoid memory leaks
            await browser.close();
        }
    }
}
