import type { Role } from "../../types";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}
