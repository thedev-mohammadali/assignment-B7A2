import { compare, hash } from "bcrypt";
import { pool } from "../../db";
import type {
  ILoginPayload,
  ISignupPayload,
  IUserData,
} from "./auth.interface";

import jwt from "jsonwebtoken";
import config from "../../config";

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

const loginService = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  //Check if user exists
  const userDataFromDB = await pool.query(
    `
    SELECT * FROM users
    WHERE email=$1
    `,
    [email],
  );

  if (userDataFromDB.rowCount === 0) {
    throw new Error("Invalid Credentials!");
  }

  //Get the user data
  const userData = userDataFromDB.rows[0] as IUserData;
  const { password: passwordHash, ...user } = userData;

  //Validate password
  const isValid = await compare(password, passwordHash);

  if (!isValid) {
    throw new Error("Invalid Credentials!");
  }

  //Generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.secret, {
    expiresIn: config.tokenExpiresIn,
  });

  return { token, user };
};

export const authService = {
  signupService,
  loginService,
};
