import { Pool, QueryResult } from "pg";
import { IUser } from "../interfaces/index";

export default class LoginModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async validateLogin(
    username: string,
    password: string
  ): Promise<IUser | null> {
    const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const values = [username, password];

    try {
      const result: QueryResult = await this.pool.query(query, values);
      const user: IUser | null = result.rows[0] || null;
      return user;
    } catch (error) {
      throw new Error(`Error validating login: ${error}`);
    }
  }
}
