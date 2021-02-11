// the log level (debug: for text messages at every step | trace for text messages and screenshots of the screens at every step)
let level = 'default';

module.exports = {
    log: async function (page, app, step, msg) {
        if (isDebug()) {
            console.log(`[${timestamp()}] [${app}] [${step}] ${msg}`);
        }
        if (isTrace()) {
            const name = `screenshot-${app.toLowerCase()}-${step}-${msg.replaceAll(' ', '-').toLowerCase()}.png`;
            await page.screenshot({path: name});
        }
    },
    info: function (msg) {
        console.log(`[${timestamp()}] ${msg}`);
    },
    setDebug: function () {
        level = 'debug';
    },
    setTrace: function () {
        level = 'trace';
    },
    getLevel: function () {
        return level;
    }
}

const isDebug = () => {
    return 'debug' === level || isTrace();
}

const isTrace = () => {
    return 'trace' === level;
}

const timestamp = () => {
    return new Date().toISOString();
}
