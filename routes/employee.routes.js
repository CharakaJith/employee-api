const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const EmployeeSchema = require('../schemas/employee.schema');
const ValidateRequestBody = require('../middlewares/validators/request.validator');
const EmployeeController = require('../controllers/employee.controller');
const checkAuth = require('../middlewares/auth/authenticate');
const checkRole = require('../middlewares/auth/authorize');
const { USER_ROLE } = require('../enum/role');

router.use(checkAuth);
router.use(checkRole(USER_ROLE.ADMIN));

router.post(
    '/',     
    checkSchema(EmployeeSchema.validateEmployee),
    ValidateRequestBody,
    EmployeeController.createEmployee
);

router.get('/', EmployeeController.getAllEmployees);

router.get(
    '/:id', 
    checkSchema(EmployeeSchema.validateEmployeeId), 
    ValidateRequestBody, 
    EmployeeController.getEmployeeById
);

router.put(
    '/:id',
    checkSchema(EmployeeSchema.validateEmployee),
    ValidateRequestBody,
    EmployeeController.updateEmployeeDetails
);

router.patch(
    '/:id',
    checkSchema(EmployeeSchema.validateUpdateEmployee),
    ValidateRequestBody,
    EmployeeController.partialUpdateEmployee
);

router.delete(
    '/:id',
    checkSchema(EmployeeSchema.validateEmployeeId),
    ValidateRequestBody,
    EmployeeController.deleteEmployeeById
);

module.exports = router;