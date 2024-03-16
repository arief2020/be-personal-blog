const dotenv = require('dotenv');
const ProfileRepository = require('../repositories/ProfileRepository');
const fs = require('fs'); 
dotenv.config()


const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class ProfileService {
  static async getAll(params) {
    try {
      let { limit, page } = params;

      limit = +limit || DEFAULT_LIMIT;
      page = +page || DEFAULT_PAGE;

      let offset = (page - 1) * limit;

      const profileData = await ProfileRepository.getAllAndCount(limit, offset);
      const { rows, count } = profileData;

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

  static async getProfileById(params) {
    try {
      const { id } = params;
      const profile = await ProfileRepository.getProfileById(+id);
      if (profile === null)
        throw { name: "ErrorNotFound", message: "Profile Not Found" };

      return { message: "Success get profile by id", data: profile };
    } catch (error) {
      throw error;
    }
  }
  static async store(params) {
    try {
      let {file, body} = params
      let { bio, address, age, user_id } = body;

      if (!file) {
        throw {name: "BadRequest", message: "Insert your photo profile"}
      }
      const url = `${process.env.BASE_URL}/api/images/${file.filename}`

      const movies = await ProfileRepository.createProfile({
        photo_user: url,
        bio,
        address,
        age: +age,
        user_id: +user_id
      });

      return { message: "Success Create Profile", data: movies };
    } catch (error) {
      throw error;
    }
  }
  static async update(params) {
    try {
      let { id, body, file } = params;
      let { bio, address, age, user_id } = body;
  
      const url = `${process.env.BASE_URL}/api/images/${file.filename}`;
  
      const profile = await ProfileRepository.getProfileById(+id);
  
      if (!profile) {
        throw { name: "ErrorNotFound", message: "Profile Not Found" };
      }
  
      let photo_user = file ? url : profile.photo_user;
  
      if (!file && !profile.photo_user) {
        throw { name: "BadRequest", message: "Insert your photo profile" };
      }
  
      if (photo_user === url) {
        const image = profile.photo_user.replace(
          `${process.env.BASE_URL}/api/images/`,
          ""
        );
        console.log(image)
        fs.unlink(`./uploads/${image}`, function (err) {
          if (err) throw err;
          console.log("File deleted!");
        });
      }
  
      bio = bio || profile.bio;
      address = address || profile.address;
      age = age || profile.age;
      user_id = user_id || profile.user_id;
  
      await ProfileRepository.update(
        {
          photo_user,
          bio,
          address,
          age,
          user_id,
        },
        +id
      );
  
      return { message: "Success update movies" };
    } catch (error) {
      throw error;
    }
  }

}

module.exports = ProfileService;
