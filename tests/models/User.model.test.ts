import { expect } from "chai";
import UserMother from "../objectMother/UserMother";

const startTest = () => {
  describe("User Model - Unit Test", () => {
    it("Should bi invalid if idUser is empty", () => {
      const user = UserMother.withOutUser(["idUser"]);
      user.validate((err) => {
        expect(err).to.exist;
      });
    });
  });
};

export default { startTest };
