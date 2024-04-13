const models = require('../models');

const EmployeeService = {
    /**
     * Function to create a new record in table "employee"
     * 
     * @param {Object} employeeDetails: employee details object 
     * @returns a newly created employee
     */
    createNewEmployee: async (employeeDetails) => {
        try {
            return await models.Employee.create(employeeDetails);
        } catch (error) {
            throw new Error(`Internal server error while creating a new employee: ${error.message}`);
        }
    },

    /**
     * Function to fetch a record from table "employee" by column 'empAdminId' and 'empStatus'
     * 
     * @param {Int} adminId: id of the admin 
     * @returns an object of employee details if exists, else null
     */
    getAllEmployees: async (adminId) => {
        try {
            return await models.Employee.findAll({
                where: {
                    empAdminId: adminId,
                    empStatus: true
                }
            });
        } catch (error) {
            throw new Error(`Internal server error while fetching employees by admin id: ${error.message}`);
        }
    },

    /**
     * Function to fetch a record from table "employee" by column 'id' and 'empStatus'
     * 
     * @param {Int} employeeId: id of the employee 
     * @returns an object of employee details if exists, else null
     */
    getEmployeeById: async (employeeId) => {
        try {
            return await models.Employee.findOne({
                where: {
                    id: employeeId,
                    empStatus: true
                }
            });
        } catch (error) {
            throw new Error(`Internal server error while fetching employee by id: ${error.message}`);
        }
    },

    /**
     * Function to fetch a record from table "employee" by column 'empNo' and 'empAdminId'
     * @param {String} employeeNo: number of the employee 
     * @param {Int} adminId: id of the admin 
     * @returns an object of employee details if exists, else null
     */
    getEmployeeByNumber: async (employeeNo, adminId) => {
        try {
            return await models.Employee.findOne({
                where: {
                    empNo: employeeNo,
                    empAdminId: adminId
                }
            });
        } catch (error) {
            throw new Error(`Internal server error while fetching employee by number: ${error.message}`);
        }
    },

    /**
     * Function to update an existing record in table "employee" by column 'id'
     * 
     * @param {Object} employeeDetails: employee detail object 
     * @returns an array of updated employee details and the number of records affected
     */
    updateEmployeeDetails: async (employeeDetails) => {
        try {
            return await models.Employee.update(employeeDetails, {
                where: {
                    id: employeeDetails.id
                },
                returning: true
            });
        } catch (error) {
            throw new Error(`Internal server error while updating employee by id: ${error.message}`);
        }
    }
};

module.exports = EmployeeService;