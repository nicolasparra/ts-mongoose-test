import express from "express";
import morgan from "morgan";
import { PORT } from "./config";
import * as bodyParser from "body-parser";

// Routes
import UserRouter from "./routes/User.router";

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.settings();
    this.routes();
  }

  settings() {
    this.app.set("port", PORT);
  }

  middlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    // this.app.use(express.urlencoded({ extended: false }));
    // this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/user", new UserRouter().router);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(">>> Server is running at", this.app.get("port"));
    });
  }
}

export default App;
