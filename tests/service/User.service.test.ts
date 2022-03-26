import { expect } from "chai";
import sinon, { StubbedInstance, stubInterface, stubObject } from "ts-sinon";
import UserService from "../../src/services/User.service";
import UserModel from "../../src/models/User.model";
import UserMother from "../objectMother/UserMother";

/*

**** https://betterprogramming.pub/writing-unit-tests-for-your-nodejs-api-13257bd0e46b
https://medium.com/nowports-tech/unit-crash-testing-c2fc2c4368d7
https://codeutopia.net/blog/2016/06/10/mongoose-models-and-unit-tests-the-definitive-guide/

https://openbase.com/js/ts-sinon/documentation

https://codesandbox.io/s/d7hbo?file=/src/service.ts:119-126

https://github.com/jatinpatel136/NoteTakingApp/blob/master/test/controllers/note.controller.spec.js
*/

const startTest = async () => {
  describe("User Service - Unit Test", async () => {
    const userService = new UserService();
    // it("Hola Mundo", async () => {
    //   const mockBD = sinon.mock(UserModel);
    //   mockBD
    //     .expects("find")
    //     .once()
    //     .withArgs({})
    //     .resolves({ idUser: "1", name: "mock" });
    //   const response = await userService.getAll();
    //   expect(response).to.have.property("idUser");
    //   mockBD.verify();
    //   mockBD.restore();
    //   // .yield(null, { algo: "W" }, null);
    // });
    it("Save a User", async () => {
      sinon.stub(UserModel);
      sinon.stub(UserModel.prototype, "save").returns({
        idUser: "1",
        name: "Mother",
        password: "pass",
        picture: "LinkPicture",
        date: new Date(),
      });

      const response = await userService.create({
        idUser: "1",
        name: "Mother",
        password: "pass",
        picture: "LinkPicture",
        date: new Date(),
      });

      expect(response).to.have.property("idUser");
      expect(response.idUser).to.equal("1");

      /*
      
      await getUser({
        profileId,
      }).catch((error) => {
        expect(error.message).to.equal("No user not found with given profileId")
      });
      */
    });
  });
};

export default { startTest };

/*
describe("User module", function () {
var User = require('../models/User');
var UserMock = sinon.mock(User);
UserMock
.expects('findOneAndUpdate').withArgs( {UserId: 9 },{ $set: { Name: 'Lol'}},{ new: true })
.yields(null, {UserId: 9, Username: 'Lol'});

describe("POST /setUsername", function () {
    it("returns status code 200", function (done) {
        request.post({
            url: setUsernameUrl,
            qs: { userId: '9', username: 'Lol' }
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
*/
