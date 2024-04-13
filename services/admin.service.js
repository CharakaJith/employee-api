const models = require('../models');

const AdminService = {
    /**
     * Function to create a new record in table "admin" 
     * 
     * @param {Object} adminDetails: admin details object 
     * @returns a newly created admin object
     */
    createNewAdmin: async (adminDetails) => {
        try {
            return await models.Admin.create(adminDetails);
        } catch (error) {
            throw new Error(`Internal server error while creating a new admin: ${error.message}`);
        }
    },

    /**
     * Function to fetch a record from table "admin" by coulmn 'adminEmail'
     * 
     * @param {String} email: email of the admin 
     * @returns an object of admin details if exists, else null
     */
    findAdminByEmail: async (email) => {
        try {
            return await models.Admin.findOne({
                where: {
                    adminEmail: email,
                },
            });
        } catch (error) {
            throw new Error(`Internal server error while fetching the admin by email: ${error.message}`);
        }
    }
};

module.exports = AdminService;