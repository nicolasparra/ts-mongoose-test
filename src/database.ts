import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export async function connect() {
  try {
    // const mongoOptotion = {

    // }
    await mongoose.connect(MONGO_URI);
    console.log(">>> Database connected");
  } catch {
    console.log("Error");
  }
}
