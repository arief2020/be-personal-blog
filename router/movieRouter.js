const express = require("express");
const MoviesControllers = require("../controllers/MoviesControllers");

const router = express.Router();

router.get("/", MoviesControllers.getAll);

router.get("/:id", MoviesControllers.getMoviesById);

router.post("/", MoviesControllers.store);

router.put("/:id", MoviesControllers.update);

router.delete("/:id", MoviesControllers.delete);

module.exports = router;
