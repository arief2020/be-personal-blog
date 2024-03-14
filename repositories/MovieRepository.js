const { Movies } = require("../models");

class MovieRepository {
  static async getAllAndCount(limit, offset) {
    try {
      const { rows, count } = await Movies.findAndCountAll({
        limit,
        offset,
      });
      return { rows, count };
    } catch (error) {
        throw error
    }
  }
  static async getMoviesById(id) {
    try {
        const movie = await Movies.findByPk(id)
        return movie
    } catch (error) {
        throw error
    }
  }
  static async createMovies(data) {
    try {
        const movies = await Movies.create(data)
        return movies
    } catch (error) {
        throw error
    }
  }

  static async update(data, id){
    try {
      const movie = await Movies.update(data,{
        where:{
          id
        }
      })
      return movie
      
    } catch (error) {
      throw error
    }
  }
  static async destroy(id){
    try {
      const movies = await Movies.destroy({
        where:{
          id
        }
      })
      return movies
    } catch (error) {
      throw error
    }
  }
}

module.exports = MovieRepository;
