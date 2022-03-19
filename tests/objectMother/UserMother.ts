//https://blog.koalite.com/2018/02/test-builders-en-typescript/
import UserModel from "../../src/models/User.model";

export default class UserMother {
  private static randomUser: Object = {
    idUser: "1",
    name: "Mother",
    password: "pass",
    picture: "LinkPicture",
    date: new Date(),
  };

  public static withUser(...options: Partial<typeof UserModel>[]) {
    let defaults = { ...this.randomUser };
    return new UserModel(Object.assign({}, defaults, ...options));
  }

  public static withOutUser(option: string[]) {
    let defaults = { ...this.randomUser };
    option.forEach((e) => {
      if (defaults[e]) {
        delete defaults[e];
      }
    });
    return new UserModel(defaults);
  }
}
