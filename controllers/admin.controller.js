const bcrypt = require('bcrypt');
const jwt_service = require('../util/jwt_service');
const { USER_ROLE } = require('../enum/role');
const { LOG_TYPE } = require('../enum/logType');
const { STATUS_CODE } = require('../enum/statusCode');
const AdminService = require('../services/admin.service');
const logger = require('../middlewares/logger/logger');

const AdminController = {
    adminSignup: async (req, res) => {
        try {
            const { name, email , password } = req.body;

            // check admin exists
            const admin = await AdminService.findAdminByEmail(email);
            if (admin) {
                throw new Error('Email already registered!');
            }

            // encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // save admin details
            const adminDetails = {
                adminName: name,
                adminEmail: email,
                password: encryptedPassword,
            };
            const newAdmin = await AdminService.createNewAdmin(adminDetails);
            delete newAdmin.dataValues.password;
            
            res.status(STATUS_CODE.OK).json({
                success: true,
                data: newAdmin,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `new admin ${newAdmin.id}: ${newAdmin.adminName} created`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },

    adminLogin: async (req, res) => {
        try {
            const { email , password } = req.body;

            // validate admin
            const admin = await AdminService.findAdminByEmail(email);
            if (!admin) {
                throw new Error('Invalid email or password!');
            }

            // validate password and remove it
            const isValidPassword = await bcrypt.compare(password, admin.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password!');
            }
            delete admin.dataValues.password;

            // generate access token
            const tokenUser = {
                id: admin.id,
                name: admin.adminName,
                email: admin.adminEmail,
                role: USER_ROLE.ADMIN,
            };
            const accessToken = await jwt_service.generate_access_token(tokenUser);

            res.set({
                'Access-Token': accessToken,
            });
            res.status(STATUS_CODE.OK).json({
                success: true,
                data: admin
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `admin ${admin.id}: ${admin.adminName} logged in`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });
            
            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },
};

module.exports = AdminController;