const joi = require("joi");


const ValidateRegesterData = (data) => {
    const schema = joi.object({
        username: joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Username must be a string",
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters long",
            "string.max": "Username must be at most 50 characters long",
            "any.required": "Username is required"
        }),
        
        email: joi.string()
        .required()
        .email()
        .messages({
            "string.email": "Email must be a valid email address",
            "string.base": "Email must be a string",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

        password: joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    });

    return schema.validate(data , {abortEarly: false});
}


const ValidateLoginData = (data) => {
    const schema = joi.object({
        email: joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be a valid email address",
            "string.base": "Email must be a string",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

        password: joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "any.required": "Password is required",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    });

    return schema.validate(data , {abortEarly: false});
}


module.exports = {
    ValidateRegesterData,
    ValidateLoginData
}



