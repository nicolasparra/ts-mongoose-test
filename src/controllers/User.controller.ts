import { Request, Response } from "express";
import UserService from "../services/User.service";
import { v1 as uuidv1 } from "uuid";
import User from "../models/User.model";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const userList = await this.userService.getAll();
      return res.status(200).send({ data: userList });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name, password, picture } = req.body;
      const idUser = uuidv1();
      const user = await this.userService.create({
        idUser,
        name,
        password,
        picture,
      });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const token = await this.userService.login(name, password);

      return res.status(200).send({ token: token });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
