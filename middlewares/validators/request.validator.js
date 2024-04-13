// adminValidationMiddleware.js
const { validationResult } = require('express-validator');

const ValidateRequestBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array(),
        });
    }
    next();
};

module.exports = ValidateRequestBody;
