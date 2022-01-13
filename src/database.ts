import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export async function connect() {
  try {
    const mongoOption = {
      //autoIndex: false, // Don't build indexes
      //maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      //family: 4, // Use IPv4, skip trying IPv6
      //ssl: true
      //sslValidate: false
      //sslCA: `${__dirname}/rootCA.pem`
      //user: config.DB.USER,
      //pass: config.DB.PASSWORD,
    };
    await mongoose.connect(MONGO_URI, mongoOption);
    console.log(">>> Database connected");
  } catch {
    console.log("Error");
  }
}
