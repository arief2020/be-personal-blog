const bcrypt = require("bcrypt");

const UserServices = require("../services/UserServices");

class UserController {
  
  static async getAll(req, res, next) {
    try {
      const users = await UserServices.getAll(req.query)

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUsersById(req, res, next) {
    try {
      const users = await UserServices.getUsersById(req.params);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const params = {
        id: req.params.id,
        body: req.body,
      };

      const users = await UserServices.update(params);

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const users = await UserServices.destroy(req.params);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = UserController;
