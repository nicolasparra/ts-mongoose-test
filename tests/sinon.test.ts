import { expect } from "chai";
import sinon, {
  StubbedInstance,
  stubInterface,
  stubObject,
  stubConstructor,
} from "ts-sinon";

const startTest = () => {
  describe("Test STUB Sinon", () => {
    it("Test - stubObject", () => {
      class Test {
        method() {
          return "original";
        }
      }

      const test = new Test();
      const testStub = stubObject<Test>(test);
      testStub.method.returns("stubbed");

      expect(testStub.method()).to.equal("stubbed");
    });

    it("Test - stubObject - Partial Stub ", () => {
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

    it("Test - stubObject - Real Function", () => {
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
      const testStub = stubObject<Test>(test, []);

      expect(testStub.methodA()).to.equal("A: original");
      expect(testStub.methodB()).to.equal("B: original");
    });

    it("Test - stubObject - type-safe", () => {
      class Test {
        method() {
          return "original";
        }
      }

      const test = new Test();
      const testStub = stubObject<Test>(test, { method: "stubbed" });

      expect(testStub.method()).to.equal("stubbed");
    });

    it("Test - stubInterface  - all methods", () => {
      interface Test {
        method(): string;
      }

      const testStub = stubInterface<Test>();

      expect(testStub.method()).to.be.undefined;

      testStub.method.returns("stubbed");

      expect(testStub.method()).to.equal("stubbed");
    });

    it("Test - stubInterface  - Interface stub with predefined return values (type-safe)", () => {
      interface Test {
        method(): string;
      }

      // method property has to be the same type as method() return type
      const testStub = stubInterface<Test>({ method: "stubbed" });

      expect(testStub.method()).to.equal("stubbed");
    });

    it("Test - stubConstructor - without passing predefined args to the constructor", () => {
      class Test {
        public someVar: number = 10;

        method(): string {
          return "value";
        }
      }

      // type will be guessed automatically
      const testStub = stubConstructor(Test);

      expect(testStub.method()).to.be.undefined;

      testStub.method.returns("stubbed");

      expect(testStub.method()).to.equal("stubbed");

      expect(testStub.someVar).to.equal(10);

      testStub.someVar = 20;

      expect(testStub.someVar).to.equal(20);
    });

    it("Test - stubConstructor - with passing predefined args to the constructor", () => {
      class Test {
        constructor(public someVar: string, y: boolean) {}
        // ...
      }

      // it won't allow to pass incorrect args
      const testStub = stubConstructor(Test, "someValue", true);

      expect(testStub.someVar).to.equal("someValue");
    });
  });
};

export default { startTest };
