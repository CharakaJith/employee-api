const bcrypt = require('bcrypt');
const jwt_service = require('../util/jwt_service');
const { USER_ROLE } = require('../enum/role');
const AdminService = require('../services/admin.service');

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
            
            res.status(200).json({
                success: true,
                data: newAdmin,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
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

            // validate password amd remove it
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
            res.status(200).json({
                success: true,
                data: admin
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    },
};

module.exports = AdminController;