const joi = require("joi");



function VaildateCreatCategory(obj){
    const schema = joi.object({
        title: joi.string().trim().required().min(3).max(50).messages({
            "string.base": `يجب ان تكون اسم الماده نص.`,
            "string.empty": `اسم الماده مطلوب.`,
            "string.min": `الاسم قصير جدا.`,
            "string.max": `الاسم طويل جدا.`,
            "any.required": `اسم الماده مطلوب.`
          })
    })

    return schema.validate(obj)
}


module.exports = {
    VaildateCreatCategory
}
