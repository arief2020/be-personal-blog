const express = require("express");
const UserController = require("../controllers/UsersController");

const router = express.Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getUsersById);

router.put("/:id", UserController.update);

router.delete("/:id", UserController.destroy);

module.exports = router;
