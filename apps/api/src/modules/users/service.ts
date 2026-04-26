import { db } from "../../data/mockDb";
import type { UserSummary } from "./types";

export class UsersService {
  findById(userId: string): UserSummary | undefined {
    return db.users.find((user) => user.id === userId);
  }
}
