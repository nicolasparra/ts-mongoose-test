import User, { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

export default class UserService {
  create = async (user: Object) => {
    try {
      const newUser = new User(user);
      const userSaved = await newUser.save();
      return userSaved;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  Update = async (user: Object) => {
    try {
      const newUser = new User(user);
      const userSaved = await newUser.save();
      return userSaved;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getAll = async () => {
    try {
      const users = await User.find({}).select("+password");
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  login = async (name: string, password: string) => {
    try {
      const user = await User.findOne({ name: name }).select("+password");
      if (!user) {
        throw new Error("User or password invalid");
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("User or password invalid");
      }
      return jwt.sign({ user }, JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
