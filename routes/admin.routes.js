const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const AdminSchema = require('../schemas/admin.schema');
const ValidateRequestBody = require('../middlewares/validators/request.validator');
const AdminController = require('../controllers/admin.controller');

router.post(
    '/signup', 
    checkSchema(AdminSchema.validateAdminSignup), 
    ValidateRequestBody, 
    AdminController.adminSignup
);

router.post(
    '/login', 
    checkSchema(AdminSchema.validateAdminLogin), 
    ValidateRequestBody, 
    AdminController.adminLogin
);

module.exports = router;