import { config } from "dotenv";
config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/ts-test";
const PORT = process.env.PORT || 3000;

export { MONGO_URI, PORT };
