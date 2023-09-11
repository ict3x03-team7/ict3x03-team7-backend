const request = require("supertest");
const app = require("./../../../../app");

describe("GET /dummy/:dummyName", () => {
  test("given an valid dummy name, should respond with a 200 status code", async () => {
    const response = await request(app).get("/dummy/dummy1");
    // console.log(response._body.result);
    expect(response.statusCode).toBe(200);
    expect(response._body.result.dummyName).toBe("dummy1");
  });
  test("given an invalid dummy name, should respond with a 400 status code", async () => {
    const response = await request(app).get("/dummy/dummy5");
    expect(response.statusCode).toBe(400);
  });
  test("content type header is JSON", async () => {
    const response = await request(app).get("/dummy/dummy2");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
