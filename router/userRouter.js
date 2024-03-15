const express = require("express");
const UserController = require("../controllers/UsersController");
const { authorization } = require("../middleware/authHandler");

const router = express.Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getUsersById);

router.put("/:id", authorization, UserController.update);

router.delete("/:id", authorization, UserController.destroy);

module.exports = router;
