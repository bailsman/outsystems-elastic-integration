const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const logger = require('./logger.js')
const cases = require('./cases.js')
const directory = require('./directory.js')
const sales = require('./sales.js')
const salesForMonitoring = require('./sales-for-monitoring.js')

// the domain of the environment we'll be using (default value: outsystems-dev6.outsystemsenterprise.com)
const domain = argv.domain ? argv.domain : 'outsystems-dev6.outsystemsenterprise.com';
// the number of iterations to perform (default value: forever)
const iterations = argv.iterations ? argv.iterations : -1;
// the sleeping period (in seconds) between iterations (default value: 5 seconds)
const pause = argv.pause ? argv.pause : 5;

(async () => {
    if (argv.debug) {
        await logger.setDebug();
    }
    if (argv.trace) {
        await logger.setTrace();
    }
    logger.info(`Running '${iterations}' iterations, with '${pause}' seconds pause between them, on domain '${domain}', with log level set to '${logger.getLevel()}'`);
    let step = 1;
    let runCondition = iterations === -1 ? true : step <= iterations;
    while (runCondition) {
        await cases.run(domain, step);
        await directory.run(domain, step);
        await sales.run(domain, step);
        await salesForMonitoring.run(domain, step);
        await sleep(pause);
        step++;
        runCondition = iterations === -1 ? true : step <= iterations;
    }
})().catch(logger.error);

const sleep = (seconds) => {
    logger.info(`Pausing for ${seconds} seconds...`);
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}