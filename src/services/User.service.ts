import User, { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import moment from "moment";
import xl from "excel4node";

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

  update = async (id: string, user: Object) => {
    try {
      return User.updateOne({ idUser: id }, user, {
        $set: { isModified: true },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  updateSocialNetworks = async (id: string, socialNetworks: Object) => {
    try {
      console.log(socialNetworks);
      const socialNetworksUpdated = await User.updateOne(
        { idUser: id },
        { socialNetworks: socialNetworks }
      );

      return socialNetworksUpdated;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getAll = async () => {
    try {
      const users = await User.find({}).select("+password");
      // const users = await User.find({});

      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getByIdUser = async (id: string) => {
    try {
      const user = await User.find({ idUser: id }).select(
        "+password +isDeleted"
      );

      if (user.length == 0) return user;

      user[0].picture = user[0].picture;

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getUserByCreatedAt = async (dateInit: string, dateEnd: string) => {
    try {
      const pipeline = [
        { $match: { isDeleted: true } },
        {
          $match: {
            $and: [
              { createdAt: { $lte: moment(dateEnd).toDate() } },
              { createdAt: { $gte: moment(dateInit).toDate() } },
            ],
          },
        },
      ];
      const userList = await User.aggregate(pipeline);

      return userList;
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

  delete = async (id: string) => {
    try {
      const userDeleted = await User.deleteOne({ idUser: id });

      return userDeleted;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  excel = async () => {
    try {
      const users = await User.find({}).select("+password");
      const wb = new xl.Workbook();
      const ws = wb.addWorksheet("usuarios");
      const style = wb.createStyle({
        font: {
          color: "#FF0800",
          size: 12,
        },
        numberFormat: "$#,##0.00; ($#,##0.00); -",
      });
      ws.cell(1, 1).string("Name").style(style);
      ws.cell(1, 2).string("Role").style(style);
      let row = 2;
      users.forEach((user) => {
        ws.cell(row, 1).string(user.name).style(style);
        ws.cell(row, 2).string(user.role).style(style);
        row++;
      });

      return await wb.writeToBuffer();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
}
