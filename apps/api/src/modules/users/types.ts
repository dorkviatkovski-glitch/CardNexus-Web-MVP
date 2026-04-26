import type { User } from "@cardnexus/types";

export type UserSummary = Pick<User, "id" | "email" | "name" | "createdAt">;
