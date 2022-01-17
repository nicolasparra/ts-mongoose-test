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
      return res.status(201).send({ user: user });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { name, password, picture } = req.body;
      const { id } = req.params;
      console.log(id);
      const userUpdated = await this.userService.update(id, {
        name,
        password,
        picture,
      });
      return res.status(200).send({ user: userUpdated });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      if (!name || !password)
        return res.status(400).send({ message: "Name and password required" });
      const token = await this.userService.login(name.toLowerCase(), password);

      return res.status(200).send({ token: token });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userDeleted = await this.userService.delete(id);

      return res.status(200).send({ user: userDeleted });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
