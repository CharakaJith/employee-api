const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../../enum/statusCode');
const { LOG_TYPE } = require('../../enum/logType');
const logger = require('../logger/logger');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decode = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        req.user = decode.tokenUser;

        next();
    } catch (error) {
        res.status(STATUS_CODE.UNAUTHORIZED).json({
            success: false,
            error: 'Authentication failed!'
        });

        logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
    }
};

module.exports = authenticate;