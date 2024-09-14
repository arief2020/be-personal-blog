const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../libs/bcrypt");
const AuthRepository = require("../repositories/AuthRepository");
const dotenv = require('dotenv')
dotenv.config()

class AuthService {
  static async register(params) {
    try {
      const { email, password, confirmPassword, role, gender, profile } = params;

      if (password != confirmPassword) {
        throw {
          name: "BadRequest",
          message: "Password and Confirm Password are not same",
        };
      }
      const hashingPassword = hashPassword(password);

      const register = await AuthRepository.register({
        email,
        password: hashingPassword,
        role,
        gender,
      }, profile);
      return { message: "Success register users", data: register };
    } catch (error) {
      throw error;
    }
  }

  static async login(params) {
    try {
      let { email, password } = params;

      // const queryEmail = `
      //       SELECT 
      //         * 
      //       FROM 
      //         users 
      //       WHERE email = $1
      //       `;

      // const resEmail = await pool.query(queryEmail, [email]);

      const user = await AuthRepository.searchEmailUser(email)
      if (user === null) {
        throw {name: "InvalidCredentials", message: "Email user not found"}
      }
      const matchingPassword = await comparePassword(password, user.password)
      // const matchingPassword = await bcrypt.compare(
      //   password,
      //   user.password
      // );

      if (!matchingPassword) throw { name: "InvalidCredentials" };

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return { accessToken: accessToken, message: "Success Login User" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
