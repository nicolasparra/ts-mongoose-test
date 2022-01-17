import { Router } from "express";
import UserController from "../controllers/User.controller";

// const router = Router();
// const userController = new UserController();

// router.get("/", userController.getTest);

// module.exports = router;

export default class UserRouter {
  public router = Router();
  public userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router.get("", this.userController.getUser);
    this.router.post("", this.userController.create);
    this.router.put("/:id", this.userController.update);
    this.router.delete("/:id", this.userController.delete);
    this.router.post("/login", this.userController.login);
  }
}
