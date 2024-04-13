const fs = require('fs');
const ERROR_MESSAGE = require('../constants/error.message');
const EmployeeService = require('../services/employee.service');
const { LOG_TYPE } = require('../enum/logType');
const { STATUS_CODE } = require('../enum/statusCode');
const logger = require('../middlewares/logger/logger');

const EmployeeController = {
    createEmployee: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status } = req.body;            
            const adminId = req.user.id;

            const image = req.file ? req.file.filename : null;
            if (!image) {
                throw new Error(ERROR_MESSAGE.IMAGE_NOT_UPLOAD);
            }

            // check if employee number is taken
            const employee = await EmployeeService.getEmployeeByNumber(no, adminId);
            if (employee) {
                throw new Error(ERROR_MESSAGE.EMP_NO_EXISTS);
            }

            //save employee details
            const employeeDetails = {
                empNo: no,
                empName: name,
                empAddressLine1: addressLineOne,
                empAddressLine2: addressLineTwo || null,
                empAddressLine3: addressLineThree || null,
                empDateOfJoin: dateOfJoin,
                empStatus: status,
                empImage: image,
                empAdminId: req.user.id,
            };
            const newEmployee = await EmployeeService.createNewEmployee(employeeDetails);

            res.status(STATUS_CODE.OK).json({
                success: true,
                data: newEmployee,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `employee ${newEmployee.id}: ${newEmployee.empName} created`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }        
    },

    getAllEmployees: async (req, res) => {
        try {
            const adminId = req.user.id;

            const employees = await EmployeeService.getAllEmployees(adminId);

            res.status(STATUS_CODE.OK).json({
                success: true,
                data: employees,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `all employees fetched for admin ${adminId}`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },

    getEmployeeById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const adminId = req.user.id;
            
            // validate and get employee
            const employee = await validateEmployee(id, adminId);

            res.status(STATUS_CODE.OK).json({
                success: true,
                data: employee,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `employee ${employee.id}: ${employee.empName} fetched`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },

    updateEmployeeDetails: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status } = req.body;
            const id = parseInt(req.params.id);
            const adminId = req.user.id;

            const image = req.file ? req.file.filename : null;
            if (!image) {
                throw new Error(ERROR_MESSAGE.IMAGE_NOT_UPLOAD);
            }

            // validate and get employee
            const employee = await validateEmployee(id, adminId);

            // check if employee number is taken
            const employeeByNum = await EmployeeService.getEmployeeByNumber(no, adminId);
            if (employeeByNum && employee.empNo != employeeByNum.empNo) {
                throw new Error(ERROR_MESSAGE.EMP_NO_EXISTS);
            }


            // update employee details
            const employeeDetails = {
                id: employee.id,
                empNo: no,
                empName: name,
                empAddressLine1: addressLineOne,
                empAddressLine2: addressLineTwo || null,
                empAddressLine3: addressLineThree || null,
                empDateOfJoin: dateOfJoin,
                empStatus: status,
                empImage: image,
                empAdminId: adminId,
            };
            await EmployeeService.updateEmployeeDetails(employeeDetails);
            const updatedEmployee = await EmployeeService.getEmployeeById(id);
            
            res.status(STATUS_CODE.OK).json({
                success: true,
                data: updatedEmployee,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `employee ${updatedEmployee.id}: ${updatedEmployee.empName} details updated`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },

    partialUpdateEmployee: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status } = req.body;
            const id = parseInt(req.params.id);
            const adminId = req.user.id;

            const image = req.file ? req.file.filename : null;

            // validate and get employee
            const employee = await validateEmployee(id, adminId);

            // check if employee number is taken
            if (no) {
                const employeeByNum = await EmployeeService.getEmployeeByNumber(no, adminId);
                if (employeeByNum && employee.empNo != employeeByNum.empNo) {
                    throw new Error(ERROR_MESSAGE.EMP_NO_EXISTS);
                }
            }

            // update employee details
            const employeeDetails = {
                id: employee.id,
                empAdminId: adminId,
                empNo: no || null,
                empName: name || null,
                empAddressLine1: addressLineOne || null,
                empAddressLine2: addressLineTwo || null,
                empAddressLine3: addressLineThree || null,
                empDateOfJoin: dateOfJoin || null,
                empStatus: status || null,
                empImage: image || null,
            };
            Object.keys(employeeDetails).forEach(key => employeeDetails[key] === null && delete employeeDetails[key]);

            await EmployeeService.updateEmployeeDetails(employeeDetails);
            const updatedEmployee = await EmployeeService.getEmployeeById(id);
            
            res.status(STATUS_CODE.OK).json({
                success: true,
                data: updatedEmployee,
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `employee ${updatedEmployee.id}: ${updatedEmployee.empName} details updated`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    }, 

    deleteEmployeeById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const adminId = req.user.id;
            
            // validate and get employee
            const employee = await validateEmployee(id, adminId);

            // delete employee record
            const employeeDetails = {
                id: employee.id,
                empStatus: false
            }
            await EmployeeService.updateEmployeeDetails(employeeDetails);

            res.status(STATUS_CODE.OK).json({
                success: true,
                data: 'Employee deleted successfully!',
            });

            logger(LOG_TYPE.INFO, true, STATUS_CODE.OK, `employee ${employee.id}: ${employee.empName} archived`, req);
        } catch (error) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: error.message,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, `${error.message}`, req);
        }
    },    
};

/**
 * Function to validate and get employee details
 * 
 * @param {Int} employeeId: id of the employee 
 * @param {Int} adminId: id of the admin 
 * @returns an object of employee details if valid, else throw an error
 */
async function validateEmployee(employeeId, adminId) {
    const employee = await EmployeeService.getEmployeeById(employeeId);
    if (!employee) {
        throw new Error(ERROR_MESSAGE.INVALID_EMP_ID);
    }
    if (employee.empAdminId != adminId) {
        throw new Error(ERROR_MESSAGE.PERMISSION_DENIED);
    }

    return employee;
}

module.exports = EmployeeController;