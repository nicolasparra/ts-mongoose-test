import { expect } from "chai";
import sinon, { StubbedInstance, stubInterface, stubObject } from "ts-sinon";
import UserService from "../../src/services/User.service";
import UserModel from "../../src/models/User.model";
/*
https://medium.com/nowports-tech/unit-crash-testing-c2fc2c4368d7
https://codeutopia.net/blog/2016/06/10/mongoose-models-and-unit-tests-the-definitive-guide/

https://openbase.com/js/ts-sinon/documentation

https://codesandbox.io/s/d7hbo?file=/src/service.ts:119-126

https://github.com/jatinpatel136/NoteTakingApp/blob/master/test/controllers/note.controller.spec.js
*/

const startTest = () => {
  describe("Prueba", () => {
    it("test", () => {
      class Test {
        public someProp: string = "test";
        methodA() {
          return "A: original";
        }
        methodB() {
          return "B: original";
        }
      }

      const test = new Test();
      // second argument must be existing class method name, in this case only "methodA" or "methodB" are accepted.
      const testStub = stubObject<Test>(test, ["methodA"]);
      expect(testStub.methodA()).to.be.undefined;
      expect(testStub.methodB()).to.equal("B: original");
    });
  });
};

// const startTest = () => {
//   const userService = new UserService();
//   describe("User Service - Unit Test", async () => {
//     it("Hola Mundo", async () => {
//       const mockBD = sinon.mock(UserModel);

//       mockBD
//         .expects("find")
//         .once()
//         .withArgs({})
//         .resolves({ idUser: "1", name: "mock" });

//       const response = await userService.getAll();
//       expect(response).to.have.property("idUser");
//       mockBD.verify();
//       mockBD.restore();
//       // .yield(null, { algo: "W" }, null);
//     });
//   });
// };

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

/*-------------------------------------------------------------------------------------------*/
/*

import chai from "chai";
import "mocha";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { v1 as uuidv1 } from "uuid";
import OrderQuery from "../../../../src/manage_orders/order/application/orderQuery";
import IOrderConnection from "../../../../src/manage_orders/order/domain/IOrder.connection";
const { expect } = chai;

const startTest = () => {
	describe("OrderQuery - Uses Case", () => {
		let orderConnectionMock: StubbedInstance<IOrderConnection> = null;
		let orderQueryInstance: OrderQuery = null;
		beforeEach(() => {
			orderConnectionMock = stubInterface<IOrderConnection>();
			orderQueryInstance = new OrderQuery(orderConnectionMock);
		});
		it("Success call store Procedure", async function () {
			const body_ordenes = [
				{
					numeroOrden: "0030184765",
					tipoOrden: "INSERT",
				},
			];
			const id: string = uuidv1();
			const returnOrderOut = await orderQueryInstance.orderQuery(
				body_ordenes,
				id
			);
			expect(returnOrderOut[0]).to.be.equal(undefined);
		});
		it("Failed call store Procedure", async function () {
			orderConnectionMock.procedureOrder.throws("Nothing data");
			const body_ordenes = [
				{
					numeroOrden: "0030184765",
					tipoOrden: "INSERT",
				},
			];
			const id: string = uuidv1();
			const returnOrderOut = await orderQueryInstance.orderQuery(
				body_ordenes,
				id
			);
			expect(returnOrderOut).to.be.throw;
		});
		it("Failed validate Orders", async function () {
			const body_ordenes = {
				numeroOrden: "0030184765",
				tipoOrden: "INSERT",
			};
			const id: string = uuidv1();
			const returnOrderOut = await orderQueryInstance.orderQuery(
				body_ordenes,
				id
			);
			expect(returnOrderOut).to.be.throw;
		});
	});
};
export default { startTest };
*/
