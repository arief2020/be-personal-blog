const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/UserRepository");
const { hashPassword } = require("../libs/bcrypt");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class UserServices {
  static async getAll(params) {
    try {
      let { limit, page } = params;

      limit = +limit || DEFAULT_LIMIT;
      page = +page || DEFAULT_PAGE;

      let offset = (page - 1) * limit;

      const userData = await UserRepository.getAllAndCount(limit, offset);
      const { rows, count } = userData;

      const totalPages = Math.ceil(count / limit);
      const nextPage = page + 1 <= totalPages ? page + 1 : null;
      const prevPage = page - 1 > 0 ? page - 1 : null;

      return {
        totalPages,
        currentPage: page,
        nextPage,
        prevPage,
        count: count,
        data: rows,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getUsersById(params) {
    try {
      const { id } = params;
      const users = await UserRepository.getUserById(id);
      if (users === null)
        throw { name: "ErrorNotFound", message: "User Not Found" };

      return {
        message: "Success get User by id",
        data: users,
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(params) {
    try {
      const { id, body } = params;
      const { email, password, confirmPassword, role, gender } = body;
      if (!email || !password || !confirmPassword || !role || !gender) {
        throw {
          name: "BadRequest",
          message: "field must be required by email, password, confirmPassword, role, and gender",
        };
      }

      if (password != confirmPassword) {
        throw {
          name: "BadRequest",
          message: "Password and Confirm password are not same",
        };
      }
      const hashPasswords = hashPassword(password);

      const updateUser = await UserRepository.update({email, hashPasswords, role, gender},+id)
      if (updateUser[0] === 0) {
        throw { 
          name: "ErrorNotFound", 
          message: "Users Not Found" };
      }
      return { message: "Success Update Users" };
    } catch (error) {
      throw error;
    }
  }

  static async destroy(params) {
    try {
      let { id } = params;
      const user = await UserRepository.destroy(+id);
      console.log(user)
      if (user === 0) {
        throw { name: "ErrorNotFound", message: "Users Not Found" };
      }
      return { message: "Success Delete Users" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
