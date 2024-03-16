const { Profile } = require("../models");

class ProfileRepository {
  static async getAllAndCount(limit, offset) {
    try {
      const { rows, count } = await Profile.findAndCountAll({
        limit,
        offset,
      });
      return { rows, count };
    } catch (error) {
        throw error
    }
  }
  static async getProfileById(id) {
    try {
        const profile = await Profile.findByPk(id)
        return profile
    } catch (error) {
        throw error
    }
  }
  static async createProfile(data) {
    try {
        const profile = await Profile.create(data)
        return profile
    } catch (error) {
        throw error
    }
  }

  static async update(data, id){
    try {
      const profile = await Profile.update(data,{
        where:{
          id
        }
      })
      return profile
      
    } catch (error) {
      throw error
    }
  }
  // static async destroy(id){
  //   try {
  //     const movies = await Movies.destroy({
  //       where:{
  //         id
  //       }
  //     })
  //     return movies
  //   } catch (error) {
  //     throw error
  //   }
  // }
}

module.exports = ProfileRepository;
