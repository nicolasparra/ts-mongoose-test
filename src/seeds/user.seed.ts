import User, { IUser } from "../models/User.model";
import mongoose from "mongoose";
import { MONGO_URI } from "../config";

const users = [
  {
    name: "Nombre",
    password: "123456",
    picture: "/picturePNG",
    comments: ["1", "2", "3", "4", { uno: "12312" }, "60"],
    socialNetworks: {
      github: "nicolasparra",
      facebook: "nicoas alexander",
    },
  },
];

const createUsers = async () => {
  try {
    console.log("CREATE USER");
    const BD = await mongoose.connect(MONGO_URI);
    await User.insertMany(users);
    await BD.connection.close();
  } catch (error) {
    console.log(error);
  }
};

createUsers;
