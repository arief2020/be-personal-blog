const express = require("express");
const { authorization } = require("../middleware/authHandler");
const multerMiddleware = require("../middleware/multer");
const ProfileController = require("../controllers/ProfileController");

const router = express.Router();

router.get("/", ProfileController.getAll);

router.get("/:id", ProfileController.getProfileById);

router.post("/", multerMiddleware.single('photo_user'), ProfileController.store);
router.use(authorization)
// router.post("/", authorization, MoviesControllers.store);

router.put("/:id", multerMiddleware.single('photo_user'), ProfileController.update);

// router.delete("/:id", authorization, MoviesControllers.destroy);

module.exports = router;
