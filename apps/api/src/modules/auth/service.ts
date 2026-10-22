import { hashPassword, verifyPassword } from "./password";
import { db } from "../../data/mockDb";
import type { LoginDto, SignupDto } from "./dto";
import type { AuthResponse, AuthTokenPayload } from "./types";

const encodeToken = (payload: AuthTokenPayload) =>
  Buffer.from(JSON.stringify(payload)).toString("base64url");

export class AuthService {
  signup(input: SignupDto): AuthResponse {
    if (!input || typeof input.name !== "string" || !input.name.trim() ||
        typeof input.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()) ||
        typeof input.password !== "string" || !input.password.trim()) {
      throw new Error("Name, valid email and password are required");
    }
    const email = input.email.trim().toLowerCase();
    const existing = db.users.find((user) => user.email === email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = {
      id: `user-${db.users.length + 1}`,
      email,
      name: input.name.trim(),
      createdAt: new Date().toISOString(),
    };

    const passwordHash = hashPassword(input.password);
    db.users.push(user);
    db.passwordHashes[user.id] = passwordHash;

    const token = encodeToken({ userId: user.id, email: user.email });
    return { token, userId: user.id, email: user.email, name: user.name };
  }

  login(input: LoginDto): AuthResponse {
    if (!input || typeof input.email !== "string" || typeof input.password !== "string") {
      throw new Error("Invalid credentials");
    }
    const user = db.users.find((existingUser) => existingUser.email === input.email.trim().toLowerCase());
    if (!user || !db.passwordHashes[user.id] || !verifyPassword(input.password, db.passwordHashes[user.id])) {
      throw new Error("Invalid credentials");
    }

    const token = encodeToken({ userId: user.id, email: user.email });
    return { token, userId: user.id, email: user.email, name: user.name };
  }
}
