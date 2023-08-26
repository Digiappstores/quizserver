const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  mobilenumber: Joi.string(),
  password: Joi.string(),
  email: Joi.string()
})

module.exports = {
  authSchema,
}
