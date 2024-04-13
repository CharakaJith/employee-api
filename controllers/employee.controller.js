const ERROR_MESSAGE = require('../constants/error.message');
const EmployeeService = require('../services/employee.service');

const EmployeeController = {
    createEmployee: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status, image } = req.body;
            const adminId = req.user.id;

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
                empAddressLine2: addressLineTwo ? addressLineTwo : null,
                empAddressLine3: addressLineThree ? addressLineThree : null,
                empDateOfJoin: dateOfJoin,
                empStatus: status,
                empImage: image,
                empAdminId: req.user.id,
            };
            const newEmployee = await EmployeeService.createNewEmployee(employeeDetails);

            res.status(200).json({
                success: true,
                data: newEmployee,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }        
    },

    getAllEmployees: async (req, res) => {
        try {
            const adminId = req.user.id;

            const employees = await EmployeeService.getAllEmployees(adminId);

            res.status(200).json({
                success: true,
                data: employees,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    },

    getEmployeeById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const adminId = req.user.id;
            
            // get and validate employee
            const employee = await EmployeeService.getEmployeeById(id);
            if (!employee) {
                throw new Error(ERROR_MESSAGE.INVALID_EMP_ID);
            }
            if (employee.empAdminId != adminId) {
                throw new Error(ERROR_MESSAGE.PERMISSION_DENIED);
            }

            res.status(200).json({
                success: true,
                data: employee,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    },

    updateEmployeeDetails: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status, image } = req.body;
            const id = parseInt(req.params.id);
            const adminId = req.user.id;

            // get and validate employee
            const employee = await EmployeeService.getEmployeeById(id);
            if (!employee) {
                throw new Error(ERROR_MESSAGE.INVALID_EMP_ID);
            }
            if (employee.empAdminId != adminId) {
                throw new Error(ERROR_MESSAGE.PERMISSION_DENIED);
            }

            // check if employee number is taken
            const employeeByNum = await EmployeeService.getEmployeeByNumber(no, adminId);
            if (employeeByNum && employee.empNo != employeeByNum.empNo) {
                throw new Error(ERROR_MESSAGE.EMP_NO_EXISTS);
            }


            // update employee details
            const employeeDetails = {
                id: id,
                empNo: no,
                empName: name,
                empAddressLine1: addressLineOne,
                empAddressLine2: addressLineTwo ? addressLineTwo : null,
                empAddressLine3: addressLineThree ? addressLineThree : null,
                empDateOfJoin: dateOfJoin,
                empStatus: status,
                empImage: image,
                empAdminId: req.user.id,
            };
            await EmployeeService.updateEmployeeDetails(employeeDetails);
            const updatedEmployee = await EmployeeService.getEmployeeById(id);
            
            res.status(200).json({
                success: true,
                data: updatedEmployee,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    },

    partialUpdateEmployee: async (req, res) => {
        try {
            const { no, name, addressLineOne, addressLineTwo, addressLineThree, dateOfJoin, status, image } = req.body;
            const id = parseInt(req.params.id);
            const adminId = req.user.id;

            // get and validate employee
            const employee = await EmployeeService.getEmployeeById(id);
            if (!employee) {
                throw new Error(ERROR_MESSAGE.INVALID_EMP_ID);
            }
            if (employee.empAdminId != adminId) {
                throw new Error(ERROR_MESSAGE.PERMISSION_DENIED);
            }

            // check if employee number is taken
            if (no) {
                const employeeByNum = await EmployeeService.getEmployeeByNumber(no, adminId);
                if (employeeByNum && employee.empNo != employeeByNum.empNo) {
                    throw new Error(ERROR_MESSAGE.EMP_NO_EXISTS);
                }
            }

            // update employee details
            const employeeDetails = {
                id: id,
                empAdminId: req.user.id,
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
            
            res.status(200).json({
                success: true,
                data: updatedEmployee,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    }, 

    deleteEmployeeById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const adminId = req.user.id;
            
            // get and validate employee
            const employee = await EmployeeService.getEmployeeById(id);
            if (!employee) {
                throw new Error(ERROR_MESSAGE.INVALID_EMP_ID);
            }
            if (employee.empAdminId != adminId) {
                throw new Error(ERROR_MESSAGE.PERMISSION_DENIED);
            }

            // delete employee record
            await EmployeeService.changeEmployeeStatusById(employee.id);

            res.status(200).json({
                success: true,
                data: 'Employee deleted successfully!',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: [ {
                    msg: error.message 
                }],
            });
        }
    }
};

module.exports = EmployeeController;