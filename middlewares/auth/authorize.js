const authorize = (...allowedRoles) => {
    checkRole = async (req, res, next) => {
        try {
            console.log(req.user);
            console.log(allowedRoles);
            const userRole = req.user.role;
            
            if (!allowedRoles.includes(userRole)) {
                throw new Error();
            }

            next();
            
        } catch (error) {
            return res.status(403).json({
                success: false,
                error: 'Forbidden request!'
            });
        }
    }
    
    return checkRole;
};

module.exports = authorize;