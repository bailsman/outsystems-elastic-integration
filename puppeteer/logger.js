// the log level (debug: for text messages at every step | trace for text messages and screenshots of the screens at every step)
let logLevel = 'info';

const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.printf(info => `${info.message}`),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, 'run.log'),
            maxsize: (1024 * 1024),
            maxFiles: 3,
            tailable: true,
            zippedArchive: false
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    ]
});

module.exports = {
    trace: async function (page, app, step, msg) {
        logger.debug(`[${timestamp()}] [${app}] [${step}] ${msg}`);
        if (isTrace()) {
            const name = `screenshot-${app.toLowerCase()}-${step}-${msg.replaceAll(' ', '-').toLowerCase()}.png`;
            await page.screenshot({path: name});
        }
    },
    error: function (msg) {
        logger.error(`[${timestamp()}] ${msg}`);
    },
    info: function (msg) {
        logger.info(`[${timestamp()}] ${msg}`);
    },
    setDebug: function () {
        logLevel = 'debug';
        logger.level = logLevel;
    },
    setTrace: function () {
        logLevel = 'trace';
        logger.level = 'debug';
    },
    getLevel: function () {
        return logLevel;
    }
}

const isTrace = () => {
    return 'trace' === logLevel;
}

const timestamp = () => {
    return new Date().toISOString();
}
