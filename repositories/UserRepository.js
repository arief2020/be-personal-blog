const { User, Profile } = require("../models");

class UserRepository {
  static async getAllAndCount(limit, offset) {
    try {
      const { rows, count } = await User.findAndCountAll({
        offset,
        limit,
        include: Profile
      });
      return { rows, count };
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      const movie = await User.findOne({where:{
        id
      }, include: Profile});
      return movie;
    } catch (error) {
      throw error;
    }
  }
  //   static async createMovies(data) {
  //     try {
  //         const movies = await Movies.create(data)
  //         return movies
  //     } catch (error) {
  //         throw error
  //     }
  //   }

    static async update(data, id){
      try {
        const user = await User.update(data,{
          where:{
            id
          }
        })
        return user

      } catch (error) {
        throw error
      }
    }
    static async destroy(id){
      try {
        const user = await User.destroy({
          where:{
            id
          }
        })
        return user
      } catch (error) {
        throw error
      }
    }
}

module.exports = UserRepository;
