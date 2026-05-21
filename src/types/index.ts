import type { JwtPayload } from "jsonwebtoken";

export const Roles = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export interface IResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string;
}

export interface IJwtPayload extends JwtPayload {
  id: number;
  name: string;
  role: Role;
}
