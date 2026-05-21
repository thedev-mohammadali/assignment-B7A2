import type { Role } from "../../types";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}
