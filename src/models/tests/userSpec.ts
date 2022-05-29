import { userModel } from "../user";
import Client from "../../database";

const model = new userModel();

describe("user Model Test", () => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await model.create({
      firstname: "testFName",
      lastname: "testLName",
      password: "1234",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "testFName",
      lastname: "testLName",
    });
  });

  it("index method should return a list of users", async () => {
    const result = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "testFName",
        lastname: "testLName",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await model.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: "testFName",
      lastname: "testLName",
    });
  });
  afterAll(async (): Promise<void> => {
    const sql1 = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    const sql2 = "DELETE FROM users";
    const conn = await Client.connect();
    await conn.query(sql1);
    await conn.query(sql2);
    conn.release();
  });
});
