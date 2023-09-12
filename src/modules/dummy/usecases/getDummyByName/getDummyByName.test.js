const GetDummyByNameController = require("./getDummyByNameController.js");
const MockDummyRepo = require("../../testing/mockDummyRepo.js");
const mockDummy1 = require("../../testing/mockEntities/mockDummy1.js");
const mockDummy2 = require("../../testing/mockEntities/mockDummy2.js");
const GetDummyByName = require("./getDummyByName.js");
const DummyMapper = require("../../mapper/dummyMap.js");

describe("GetDummyByName Use Case", () => {
  const mockDummyRepo = new MockDummyRepo([mockDummy1, mockDummy2], false);
  const getDummyByName = new GetDummyByName(mockDummyRepo);
  const getDummyByNameController = new GetDummyByNameController(getDummyByName);
  const mockDummy1Result = DummyMapper.toGetDummyByNameResponseDTO(mockDummy1);

  test("given a valid dummy name, should respond with a 200 status code", async () => {
    const req = { params: { name: "mockDummy1" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getDummyByNameController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockDummy1Result });
  });

  test("given an invalid dummy name, should respond with a 400 status code", async () => {
    const req = { params: { name: "dummy1" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getDummyByNameController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ Error: "Dummy not found" });
  });

  test("given that the database/server is down, should respond with a 500 status code", async () => {
    const req = { params: { name: "dummy1" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockDummyRepo = new MockDummyRepo([mockDummy1, mockDummy2], true);
    const getDummyByName = new GetDummyByName(mockDummyRepo);
    const getDummyByNameController = new GetDummyByNameController(
      getDummyByName
    );

    await getDummyByNameController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ Error: "Server Error" });
  });
});
