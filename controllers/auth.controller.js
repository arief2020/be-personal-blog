const AuthService = require("../services/AuthServices");

class AuthController {
  static async register(req, res, next) {
    try {
      const registerUser = await AuthService.register(req.body);

      return res.status(200).json(registerUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const loginUser = await AuthService.login(req.body);
      return res.status(200).json(loginUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
