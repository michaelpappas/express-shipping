"use strict";

const shipItApi = require("../shipItApi");

shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");





describe("POST /", function () {
  test("valid mock", async function () {
    shipItApi.shipProduct.mockReturnValue(3092)

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 3092 });
  });

  test("throws error if empty request body", async function () {

    const resp = await request(app)
      .post("/shipments")
      .send();
      console.log("resp.body- ",resp.body)
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if missing value", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });
    expect(resp.statusCode).toEqual(400);
  });
});
