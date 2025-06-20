const User = require("../models/usermodel");
const createError = require("http-errors");
const { authSchema } = require("../helpers/validationSchema");
const { signAccessToken } = require("../helpers/JWThelpers");

module.exports = {
  // REGISTER
  addUser: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const { email } = result;

      const exists = await User.findOne({ email });
      if (exists) {
        throw createError.Conflict(`${email} already exists`);
      }

      const user = new User(result);
      const savedUser = await user.save();
      res.send(savedUser);

    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  },

  // LOGIN
  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body); // Fixed res.body to req.body

      const user = await User.findOne({ email: result.email });
      if (!user) {
        throw createError.NotFound("User not registered");
      }

      const isMatch = await user.isValidPassword(result.password); // Assuming isValidPassword is defined in your User model
      if (!isMatch) {
        throw createError.Unauthorized("Invalid username or password");
      }
      // Generate JWT token
      const accessToken = await signAccessToken(user._id);
      res.send({ accessToken });

     // res.send("Logged in successfully"); // 
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest("Invalid username/password"));
      }
      next(error);
    }
  }
};