import { productModel } from "../product";
import Client from "../../database";

const model = new productModel();

describe("product Model Test", () => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await model.create({
      product_name: "testName",
      price: 100,
      category: "testCategory",
    });
    expect(result).toEqual({
      id: 1,
      product_name: "testName",
      price: 100,
      category: "testCategory",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        product_name: "testName",
        price: 100,
        category: "testCategory",
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await model.show("1");
    expect(result).toEqual({
      id: 1,
      product_name: "testName",
      price: 100,
      category: "testCategory",
    });
  });
  afterAll(async (): Promise<void> => {
    const sql1 = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    const sql2 = "DELETE FROM products";
    const conn = await Client.connect();
    await conn.query(sql1);
    await conn.query(sql2);
    conn.release();
  });
});
