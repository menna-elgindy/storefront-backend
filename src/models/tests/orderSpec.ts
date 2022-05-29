import { orderModel } from "../order";
import { productModel } from "../product";
import Client from "../../database";
import { userModel } from "../../models/user";

const ordersmodel = new orderModel();
const productsModel = new productModel();
const usersModel = new userModel();

describe("order Model Test", () => {
  it("should have an showCurrentOrder method", () => {
    expect(ordersmodel.showCurrentOrder).toBeDefined();
  });

  beforeAll(async (): Promise<void> => {
    await productsModel.create({
      product_name: "testName1",
      price: 100,
      category: "testCategory1",
    });
  });

  beforeAll(async (): Promise<void> => {
    await usersModel.create({
      firstname: "testFName1",
      lastname: "testLName1",
      password: "1234",
    });
  });

  beforeAll(async (): Promise<void> => {
    const sql = `INSERT INTO orders (id, user_id, status) VALUES(1, 1, 'active') RETURNING *`;
    const conn = await Client.connect();
    await conn.query(sql);
    conn.release();
  });

  beforeAll(async (): Promise<void> => {
    const sql = `INSERT INTO order_products (order_id, product_id, product_quantity) VALUES(1, 1, 4) RETURNING *`;
    const conn = await Client.connect();
    await conn.query(sql);
    conn.release();
  });

  it("showCurrentOrder method should return the current order for user id = 1", async () => {
    const result = await ordersmodel.showCurrentOrder("1");
    expect(result).toEqual({
      order_id: "1",
      product_id: "1",
      product_quantity: 4,
      user_id: "1",
      status: "active",
    });
  });

  afterAll(async (): Promise<void> => {
    const sql1 = "ALTER SEQUENCE order_products_id_seq RESTART WITH 1";
    const sql2 = "DELETE FROM order_products";
    const sql3 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
    const sql4 = "DELETE FROM orders";
    const sql5 = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    const sql6 = "DELETE FROM products";
    const sql7 = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    const sql8 = "DELETE FROM users";
    const conn = await Client.connect();
    await conn.query(sql1);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);
    await conn.query(sql5);
    await conn.query(sql6);
    await conn.query(sql7);
    await conn.query(sql8);
    conn.release();
  });
});
