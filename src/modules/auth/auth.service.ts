import { hash } from "bcrypt";
import { pool } from "../../db";
import type { ISignupPayload } from "./auth.interface";

const signupService = async (payload: ISignupPayload) => {
  const { email, name, password, role } = payload;

  const hashedPassword = await hash(password, 10);

  const result = await pool.query(
    `
            INSERT INTO users(name, email, password, role)
            VALUES($1, $2, $3, COALESCE($4, 'contributor'))
            RETURNING id, name, email, role, created_at, updated_at
            `,
    [name, email, hashedPassword, role],
  );

  return result.rows[0];
};

export const authService = {
  signupService,
};
