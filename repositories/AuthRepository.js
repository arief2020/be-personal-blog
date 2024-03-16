const { User } = require("../models");
const profile = require("../models/profile");
class AuthRepository {
  static async register(data, profile) {
    try {
      const register = await User.create(data);
      await register.createProfile(profile);
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
