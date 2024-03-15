const express = require("express");
const MoviesControllers = require("../controllers/MoviesControllers");
const { authorization } = require("../middleware/authHandler");

const router = express.Router();

router.get("/", MoviesControllers.getAll);

router.get("/:id", MoviesControllers.getMoviesById);

router.post("/", authorization, MoviesControllers.store);

router.put("/:id", authorization, MoviesControllers.update);

router.delete("/:id", authorization, MoviesControllers.destroy);

module.exports = router;
