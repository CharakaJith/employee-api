// adminValidationMiddleware.js
const { validationResult } = require('express-validator');
const { STATUS_CODE } = require('../../enum/statusCode');

const ValidateRequestBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            success: false,
            error: errors.array(),
        });
    }
    next();
};

module.exports = ValidateRequestBody;
