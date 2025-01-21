const Joi = require("joi");

const validateCreateSubCategory = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be at most 50 characters long",
        "any.required": "Title is required",
      }),
    price: Joi.number()
      .min(0)
      .required()
      .messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be greater than or equal to 0",
        "any.required": "Price is required",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreateSubCategory,
};
