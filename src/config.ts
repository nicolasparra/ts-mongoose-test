import { config } from "dotenv";
config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/ts-test";
const PORT = process.env.PORT || 3000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultSecretKey";

export { MONGO_URI, PORT, JWT_SECRET_KEY };
