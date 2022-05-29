import Client from "../database";

export type order = {
  id?: number;
  user_id: string;
  status: string;
};

export type order_products = {
  id?: number;
  order_id: string;
  product_id: string;
  product_quantity: number;
};

export class orderModel {
  async showCurrentOrder(user_id: string) {
    try {
      const sql =
        "SELECT order_id, product_id, product_quantity, user_id, status FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id =($1) ORDER BY order_id DESC LIMIT 1";
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find order for this user id :${user_id}. Error: ${err}`
      );
    }
  }
}
