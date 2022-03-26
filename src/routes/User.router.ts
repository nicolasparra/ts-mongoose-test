import { Router } from "express";
import UserController from "../controllers/User.controller";

export default class UserRouter {
  private _router: Router = Router();
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this._router.get("/all", this.userController.getUser);
    this._router.get("/date", this.userController.getUserByCreatedAt);
    this._router.get("/excel", this.userController.excel);
    this._router.get("/:id", this.userController.getByIdUser);
    this._router.post("", this.userController.create);
    this._router.put("/social/:id", this.userController.updateSocialNetworks);
    this._router.put("/:id", this.userController.update);
    this._router.delete("/:id", this.userController.delete);
    this._router.post("/login", this.userController.login);
  }

  public get router(): Router {
    return this._router;
  }
}
