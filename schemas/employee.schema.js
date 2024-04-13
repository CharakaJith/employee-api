const EmployeeSchema = {
    // request body validations for employee creation
    validateEmployee: {
        no: {
            exists: {
                errorMessage: 'Employee number field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Employee number must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 10;
                },
                errorMessage: 'Employee number must be less than 10 characters!'
            }
        },
        name: {
            exists: {
                errorMessage: 'Employee name field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Employee name must be a string!' 
            },
            custom: {
                options: (value) => {
                    if (!/^[a-zA-Z\s]+$/.test(value)) {
                        throw new Error('Employee name must contain only letters and spaces!');
                    }
                    return true;
                }
            }
        },
        addressLineOne: {
            exists: {
                errorMessage: 'Address line one field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line one must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line one must be less than 100 characters!'
            }
        },
        addressLineTwo: {
            optional: { 
                nullable: true 
            }, 
            exists: {
                errorMessage: 'Address line two field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line two must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line two must be less than 100 characters!'
            }
        },
        addressLineThree: {
            optional: { 
                nullable: true 
            }, 
            exists: {
                errorMessage: 'Address line three field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line three must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line three must be less than 100 characters!'
            }
        },
        dateOfJoin: {
            exists: {
                errorMessage: 'Date of join field is empty!',
                options: { checkFalsy: true }
            },
            isDate: {
                errorMessage: 'Date of join must be a valid date in YYYY-MM-DD format!'
            }
        },
        status: {
            exists: {
                errorMessage: 'Employee status field is empty!',
                options: { checkFalsy: true }
            },
            isBoolean: {
                errorMessage: 'Employee status must be either true or false!',
            }
        }
    },

    // request body validation for employee update
    validateUpdateEmployee: {
        id: {
            exists: {
                errorMessage: 'Employee id is empty!',
                options: { checkFalsy: true }
            },
            isInt: {
                errorMessage: 'Employee id must be a number!' 
            }
        },
        no: {
            optional: { 
                nullable: true 
            },
            exists: {
                errorMessage: 'Employee number field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Employee number must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 10;
                },
                errorMessage: 'Employee number must be less than 10 characters!'
            }
        },
        name: {
            optional: { 
                nullable: true 
            },
            exists: {
                errorMessage: 'Employee name field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Employee name must be a string!' 
            },
            custom: {
                options: (value) => {
                    if (!/^[a-zA-Z\s]+$/.test(value)) {
                        throw new Error('Employee name must contain only letters and spaces!');
                    }
                    return true;
                }
            }
        },
        addressLineOne: {
            optional: { 
                nullable: true 
            },
            exists: {
                errorMessage: 'Address line one field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line one must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line one must be less than 100 characters!'
            }
        },
        addressLineTwo: {
            optional: { 
                nullable: true 
            }, 
            exists: {
                errorMessage: 'Address line two field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line two must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line two must be less than 100 characters!'
            }
        },
        addressLineThree: {
            optional: { 
                nullable: true 
            }, 
            exists: {
                errorMessage: 'Address line three field is empty!',
                options: { checkFalsy: true }
            },
            isString: { 
                errorMessage: 'Address line three must be a string!' 
            },
            custom: {
                options: (value) => {
                    return value.length <= 100;
                },
                errorMessage: 'Address line three must be less than 100 characters!'
            }
        },
        dateOfJoin: {
            optional: { 
                nullable: true 
            },
            exists: {
                errorMessage: 'Date of join field is empty!',
                options: { checkFalsy: true }
            },
            isDate: {
                errorMessage: 'Date of join must be a valid date in YYYY-MM-DD format!'
            }
        },
        status: {
            optional: { 
                nullable: true 
            },
            exists: {
                errorMessage: 'Employee status field is empty!',
                options: { checkFalsy: true }
            },
            isBoolean: {
                errorMessage: 'Employee status must be either true or false!',
            }
        }
    },

    // request body validation for parameter employee id
    validateEmployeeId: {
        id: {
            exists: {
                errorMessage: 'Employee id is empty!',
                options: { checkFalsy: true }
            },
            isInt: {
                errorMessage: 'Employee id must be a number!' 
            }
        },
    }
};

module.exports = EmployeeSchema;