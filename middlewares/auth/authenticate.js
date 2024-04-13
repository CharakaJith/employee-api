const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decode = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        req.user = decode.tokenUser;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Authentication failed!'
        });
    }
};

module.exports = authenticate;