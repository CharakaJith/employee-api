const AdminSchema = {
    // request body validations for admin signup
    validateAdminSignup: {
        name: {
            exists: {
                errorMessage: 'Name field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Email must be a string!' 
            },
            custom: {
                options: (value) => {
                    if (!/^[a-zA-Z\s]+$/.test(value)) {
                        throw new Error('Name must contain only letters and spaces!');
                    }
                    return true;
                }
            }
        },
        email: {
            exists: {
                errorMessage: 'Email field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Email must be a string!' 
            },
            isEmail: {
                errorMessage: 'Invalid email format!'
            }
        },
        password: {
            exists: {
                errorMessage: 'Password field is empty!',
                options: { checkFalsy: true }
            },
            isString: {
                errorMessage: 'Password must be a string!' 
            }
        }
    },

    // request body validations for admin login
    validateAdminLogin: {
        email: {
            exists: {
                errorMessage: 'Email field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Email must be a string!' 
            },
            isEmail: {
                errorMessage: 'Invalid email format!'
            }
        },
        password: {
            exists: {
                errorMessage: 'Password field is empty!',
                options: { checkFalsy: true }
            },
            isString: {
                errorMessage: 'Password must be a string!' 
            }
        }
    }
};

module.exports = AdminSchema;
