import { Request, Response } from "express";
import UserService from "../services/User.service";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";

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

  getByIdUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userList = await this.userService.getByIdUser(id);

      return res.status(200).send({ data: userList });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  getUserByCreatedAt = async (req: Request, res: Response) => {
    try {
      const { dateInit, dateEnd } = req.query;

      if (
        !moment(dateInit.toString()).isValid() ||
        !moment(dateEnd.toString()).isValid()
      )
        return res.status(500).send({ message: "Invalid date Format" });

      const userList = await this.userService.getUserByCreatedAt(
        dateInit.toString(),
        dateEnd.toString()
      );

      return res.status(200).send({ data: userList });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name, password, picture, comments, socialNetworks } = req.body;
      const idUser = uuidv1();
      const user = await this.userService.create({
        idUser,
        name,
        password,
        picture,
        comments,
        socialNetworks,
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

  updateSocialNetworks = async (req: Request, res: Response) => {
    try {
      const { socialNetwork } = req.body;
      const { id } = req.params;
      const socialNetworkUpdated = await this.userService.updateSocialNetworks(
        id,
        socialNetwork
      );

      return res.status(200).send({ socialNetworkUpdated });
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

  excel = async (req: Request, res: Response) => {
    try {
      const excelBuffer = await this.userService.excel();
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(excelBuffer),
        "Content-Type": "application/xlsx",
        "Content-disposition": `attachment;filename=Usuarios_${moment().format(
          "DD/MM/YYYY"
        )}.xlsx`,
      });
      res.end(excelBuffer);
      return res;
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
