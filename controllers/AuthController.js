const createError = require('http-errors')
const User = require('../models/AuthModel')
const { authSchema } = require('../helpers/validation_schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')
const { getSequenceNextValue } = require('../helpers/sequencing')

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      console.log('result', result)

      const doesExist = await User.findOne({ mobilenumber: result.mobilenumber })
      console.log('doesExist', doesExist)
      if (doesExist)
        throw createError.Conflict(`${result.mobilenumber} is already been registered`)

      var seqCounter = await getSequenceNextValue("autogen", "userid");
      const user = new User({ ...result, userId: seqCounter.userid });
      console.log('user', user)
      await user.save()

      res.send({ status: true, message: "User register successfully", data: user })
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error)
    }
  },

  login: async (req, res, next) => {
    // console.log('req, res, next', req.body)
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ mobilenumber: result.mobilenumber })
      if (!user) throw createError.NotFound('User not registered')
      // console.log('user', user.userId)
      // const isMatch = await user.isValidPassword(result.password)
      // if (!isMatch)
      //   throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.userId)
      const refreshToken = await signRefreshToken(user.userId)
      var pdata = {
        accessToken,
        refreshToken,
        mobilenumber: user.mobilenumber,
        username: user.username,
        userId: user.userId,
        email: user.email
      }
      res.send({ status: true, message: "User Login successfully", data: pdata })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },
}
