const winston = require('winston');
const { format, transport } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level} ${message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        timestamp({
            format: 'YY-M-D HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/logger.log',
            level: 'info',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: false,
            maxFiles: '30d'
        })
    ]
});

module.exports = logger;