import Client from "../database";
import bcrypt from "bcrypt";

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
};

export class userModel {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT id, firstname, lastname FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
      const sql = "SELECT id, firstname, lastname FROM users WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING id, firstname, lastname";

      const conn = await Client.connect();

      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: string = process.env.SALT_ROUNDS as string;

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.firstname}${u.lastname}. Error: ${err}`
      );
    }
  }
}
