import { Pool, QueryResult } from "pg";
import { IUser } from "../interfaces/index";

export default class UsersModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async createUser(user: IUser): Promise<IUser> {
    const { name, lastname, birthday, username, password } = user;
    const query = `
      INSERT INTO users (name, lastname, birthday, username, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, lastname, birthday, username;
    `;
    const values = [name, lastname, birthday, username, password];

    try {
      const result: QueryResult = await this.pool.query(query, values);
      const insertedUser: IUser = result.rows[0];
      return insertedUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  public async getUserById(userId: number): Promise<IUser | null> {
    const query = `
      SELECT id, name, lastname, birthday, username
      FROM users
      WHERE id = $1;
    `;
    const values = [userId];

    try {
      const result: QueryResult = await this.pool.query(query, values);
      const user: IUser | null = result.rows[0] || null;
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }
}
