const ProfileService = require("../services/ProfileService");

class ProfileController {
  static async getAll(req, res, next) {
    try {
      const profile = await ProfileService.getAll(req.query);

      return res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req, res, next) {
    try {
      const profile = await ProfileService.getProfileById(req.params);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
  static async store(req, res, next) {
    try {
      const params = {
        file : req.file,
        body: req.body
      }
      const profile = await ProfileService.store(params);
      return res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const params = {
        id: req.params.id,
        body: req.body,
        file: req.file
      };

      const movies = await ProfileService.update(params);

      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

//   static async destroy(req, res, next) {
//     try {
//       const movies = await ProfileService.destroy(req.params);
//       return res.status(200).json(movies);
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async uploads(req, res, next) {
//     try {
//       const url = await ProfileService.uploads(req.file);

//       res.status(201).json({
//         message: "Upload success",
//         image_url: url,
//       });
//     } catch (error) {
//       next(error)
//     }
//   }
}

module.exports = ProfileController;
