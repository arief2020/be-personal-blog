const MovieServices = require("../services/MovieServices");

class MoviesControllers {
  static async getAll(req, res, next) {
    try {
      const movies = await MovieServices.getAll(req.query);

      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getMoviesById(req, res, next) {
    try {
      const movies = await MovieServices.getMoviesById(req.params);
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
  static async store(req, res, next) {
    try {
      const movies = await MovieServices.store(req.body);
      return res.status(201).json(movies);
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

      const movies = await MovieServices.update(params);

      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const movies = await MovieServices.destroy(req.params);
      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async uploads(req, res, next) {
    try {
      const url = await MovieServices.uploads(req.file);

      res.status(201).json({
        message: "Upload success",
        image_url: url,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MoviesControllers;
