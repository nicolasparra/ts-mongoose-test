import express from "express";
import morgan from "morgan";
import { PORT } from "./config";

// Routes
import UserRouter from "./routes/User.router";

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", PORT);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
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
