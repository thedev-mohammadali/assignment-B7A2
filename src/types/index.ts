export const Roles = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
