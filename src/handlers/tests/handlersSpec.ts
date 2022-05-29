import supertest from "supertest";
import app from "../../server";
import Client from "../../database";
import { productModel } from "../../models/product";
import { userModel } from "../../models/user";

const request = supertest(app);
const productsModel = new productModel();
const usersModel = new userModel();
let token = "";

describe("Test responses from endpoints", () => {
  describe("main endpoint: /", () => {
    it("gets /", async (): Promise<void> => {
      const response = await request.get("/");
      expect(response.status).toBe(200);
    });
  });

  describe("users endpoint", () => {
    beforeAll(async (): Promise<void> => {
      await usersModel.create({
        firstname: "testFName1",
        lastname: "testLName1",
        password: "1234",
      });
    });
    it("posts /users", async (): Promise<void> => {
      const response = await request.post("/users").send({
        firstname: "testFName2",
        lastname: "testLName2",
        password: "1234",
      });
      expect(response.status).toBe(200);
      token = response.body;
    });

    it("gets /users", async (): Promise<void> => {
      const response = await request
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("gets /users/2", async (): Promise<void> => {
      const response = await request
        .get("/users/2")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("products endpoint", () => {
    beforeAll(async (): Promise<void> => {
      await productsModel.create({
        product_name: "testName1",
        price: 100,
        category: "testCategory1",
      });
    });
    it("gets /products", async (): Promise<void> => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });

    it("gets /products/1", async (): Promise<void> => {
      const response = await request.get("/products/1");
      expect(response.status).toBe(200);
    });

    it("posts /products", async (): Promise<void> => {
      const response = await request
        .post("/products")
        .send({
          product_name: "testName2",
          price: 100,
          category: "testCategory2",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("orders endpoint", () => {
    beforeAll(async (): Promise<void> => {
      const sql = `INSERT INTO orders (id, user_id, status) VALUES(1, 2, 'active') RETURNING *`;
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

    it("gets /orders where user_id =2 ", async (): Promise<void> => {
      const response = await request
        .get("/orders/2")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
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
