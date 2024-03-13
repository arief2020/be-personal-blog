const { Movies } = require("../models");

class MoviesControllers {
  static async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;

      const amount = await Movies.count();

      if (page === "all") {
        const moviesAll = await Movies.findAll();
        return res.status(200).json({
          count: amount,
          data: moviesAll,
        });
      }

      limit = +limit || 10;
      page = +page || 1;

      const movies = await Movies.findAll({
        limit,
        offset: (page - 1) * limit,
      });

      const totalPages = Math.ceil(amount / limit);
      const nextPage = page + 1 <= totalPages ? page + 1 : null;
      const prevPage = page - 1 > 0 ? page - 1 : null;

      return res.status(200).json({
        totalPages,
        nextPage,
        prevPage,
        count: amount,
        data: movies,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMoviesById(req, res, next) {
    try {
      const {id} = req.params
      const movies = await Movies.findByPk(id)
      if (movies === null) throw {name: "ErrorNotFound", message: "Movies Not Found"}
      res.status(200).json({message: "Success get movies by id", data: movies})
    } catch (error) {
      next(error)
    }
  }
  static async store(req, res, next) {
    try {
      let { title, genres, year } = req.body;

      if (!title || !genres || !year) {
        throw {name: "BadRequest", message: "field must be required by title, genres, and year"}
      }

      const movies = await Movies.create({title, genres, year}) // line 61

      return res.status(201).json({message: "Success Create Movies", data: movies});
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let { title, genres, year } = req.body;
      const { id } = req.params;

      const moviesSearch = await Movies.findByPk(id)
      console.log(moviesSearch)

      

      if (moviesSearch === null) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" }; 
      }

      title = title || moviesSearch.title
      genres = genres || moviesSearch.genres
      year = year || moviesSearch.year

      await Movies.update({title, genres, year}, {
        where:{
          id
        }
      })

      return res.status(200).json({message: "Success update movies"})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await Movies.destroy({
        where:{
          id
        }
      })

      if (movies === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }
      return res.status(200).json({message: "Success Delete Data By ID"});
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MoviesControllers;
