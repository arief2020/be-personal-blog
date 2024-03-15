const MovieRepository = require("../repositories/MovieRepository");
const dotenv = require('dotenv')
dotenv.config()

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class MovieServices {
  static async getAll(params) {
    try {
      let { limit, page } = params;

      limit = +limit || DEFAULT_LIMIT;
      page = +page || DEFAULT_PAGE;

      let offset = (page - 1) * limit;

      const movieData = await MovieRepository.getAllAndCount(limit, offset);
      const { rows, count } = movieData;

      const totalPages = Math.ceil(count / limit);
      const nextPage = page + 1 <= totalPages ? page + 1 : null;
      const prevPage = page - 1 > 0 ? page - 1 : null;

      return {
        totalPages,
        currentPage: page,
        nextPage,
        prevPage,
        count: count,
        data: rows,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getMoviesById(params) {
    try {
      const { id } = params;
      const movies = await MovieRepository.getMoviesById(id);
      if (movies === null)
        throw { name: "ErrorNotFound", message: "Movies Not Found" };

      return { message: "Success get movies by id", data: movies };
    } catch (error) {
      throw error;
    }
  }
  static async store(params) {
    try {
      let { title, genres, year, photo } = params;

      if (!title || !genres || !year) {
        throw {
          name: "BadRequest",
          message: "field must be required by title, genres, and year",
        };
      }

      const movies = await MovieRepository.createMovies({
        title,
        genres,
        year,
        photo
      });

      return { message: "Success Create Movies", data: movies };
    } catch (error) {
      throw error;
    }
  }
  static async store2(params) {
    try {
      let { title, genres, year } = params;

      if (!title || !genres || !year) {
        throw {
          name: "BadRequest",
          message: "field must be required by title, genres, and year",
        };
      }

      const movies = await MovieRepository.createMovies({
        title,
        genres,
        year,
        photo
      });

      return { message: "Success Create Movies", data: movies };
    } catch (error) {
      throw error;
    }
  }
  static async update(params) {
    try {
      let {id, body} = params
      let { title, genres, year, photo } = body;

      const movieThere = await MovieRepository.getMoviesById(+id)
      
      if (movieThere === null) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }

      title = title || movieThere.title;
      genres = genres || movieThere.genres;
      year = year || movieThere.year;
      photo = photo || movieThere.photo;

      await MovieRepository.update({title, genres, year}, +id)

      return { message: "Success update movies" };
    } catch (error) {
      throw error;
    }
  }

  static async destroy(params) {
    try {
      const { id } = params;
      const movies = await MovieRepository.destroy(id);

      if (movies === 0) {
        throw { name: "ErrorNotFound", message: "Movies Not Found" };
      }
      return { message: "Success Delete Data By ID" };
    } catch (error) {
      throw error;
    }
  }
  static async uploads(file){
    try {
      if(file) {
        // create url
        const url = `${process.env.BASE_URL}/api/images/${file.filename}`

        return url;
    } else {
        throw {name: "MissingFile"}
    }
    } catch (error) {
      
    }
  }
}

module.exports = MovieServices;
