const joi = require("@hapi/joi");
const schema = {
    user : joi.object({
        firstName: joi.string().max(100).required(),
        lastName: joi.string().max(100).required(),
        gender: joi.string().valid("male","female","other").required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        phone: joi.number().integer().min(1000000000).message("invalid phone number").max(9999999999).message("invalid phone number").required()
    })
};
module.exports=schema;