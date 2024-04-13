const models = require('../models');

const EmployeeService = {
    createNewEmployee: async (employeeDetails) => {
        try {
            console.log(employeeDetails);
            return await models.Employee.create(employeeDetails);
        } catch (error) {
            throw new Error(`Internal server error while creating a new employee: ${error.message}`);
        }
    },

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
    },

    changeEmployeeStatusById: async (employeeId) => {
        try {
            return await models.Employee.update({
                    empStatus: false
                },
                {
                where: {
                    id: employeeId,
                },                
            });
        } catch (error) {
            throw new Error(`Internal server error while deleting employee by id: ${error.message}`);
        }
    }
};

module.exports = EmployeeService;