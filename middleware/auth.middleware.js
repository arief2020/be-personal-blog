const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (token == null) throw {name : "Unauthenticated"};
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECREt);

    const user = await UserRepository.getUserById(id)
    if (user === null) {
        throw {name: "Unauthenticated"}
      };
      req.loggedUser = {
        id: user.id,
        email: user.email,
        role: user.role,
    }
    next();
  } catch (error) {
    next(error)
  }
};

const authorization = async (req, res, next) => {
  try {
        const {role} = req.loggedUser;

        if(role === "admin") {
            // Allowed to execute
            next();
        } else {
            throw {name: "Unauthorized"}
        }
  } catch (error) {
    next(error);
  }
}

module.exports = {authentication, authorization};
