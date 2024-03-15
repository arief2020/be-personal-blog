const { User } = require("../models");
class AuthRepository {
  static async register(data) {
    try {
      const register = await User.create(data);
      return register;
    } catch (error) {
      throw error;
    }
  }
  static async searchEmailUser(email) {
    try {
      const searchEmail = await User.findOne({ where: { email } });
      return searchEmail;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthRepository;
