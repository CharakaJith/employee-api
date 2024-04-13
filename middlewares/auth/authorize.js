const { STATUS_CODE } = require('../../enum/statusCode');
const { LOG_TYPE } = require('../../enum/logType');
const logger = require('../log/logger');

const authorize = (...allowedRoles) => {
    checkRole = async (req, res, next) => {
        try {
            const userRole = req.user.role;
            
            if (!allowedRoles.includes(userRole)) {
                throw new Error('Forbidden request!');
            }

            next();
            
        } catch (error) {
            res.status(STATUS_CODE.FORBIDDEN).json({
                success: false,
                error: error.message
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    }
    
    return checkRole;
};

module.exports = authorize;