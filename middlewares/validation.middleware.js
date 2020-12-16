const Joi = require('joi');

const userSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    .with('username', 'password');


const validate = (shema) => async(req, res, next) => {
    try {
        await shema.validateAsync(req.body);
        next();
    }
    catch (err) {
        res.send(err.message);
    }
}


module.exports = validate(userSchema);