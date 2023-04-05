const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  phonenumber: Joi.string()
})

module.exports = {
  authSchema,
}
