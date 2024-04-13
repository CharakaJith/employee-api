const index = require('./index');
const LOG_TYPES = require('../../enum/logType');

const logger = (logType, responseStatus, statusCode, message, req, stack) => {
    const logBody = {
        logType: logType,
        endpoint: req.originalUrl,
        request: {
            request: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            method: req.method,
        },
        response: {
            success: responseStatus,
            statusCode: statusCode,
            message: {
                message,
            },
            ...(stack && {
                stack: stack,
            })
        }
    };

    const logString = JSON.stringify(logBody).split('\n');

    if (logType === LOG_TYPES.INFO) {
        index.info(logString);
    } else if (logType == LOG_TYPES.DEBUG) {
        index.debug(logString);
    } else {
        index.error(logString);
    }
};

module.exports = logger;