import { db } from "../../data/mockDb";
import type { LoginDto, SignupDto } from "./dto";
import type { AuthResponse, AuthTokenPayload } from "./types";

const encodeToken = (payload: AuthTokenPayload) =>
  Buffer.from(JSON.stringify(payload)).toString("base64url");

export class AuthService {
  signup(input: SignupDto): AuthResponse {
    const existing = db.users.find((user) => user.email === input.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = {
      id: `user-${db.users.length + 1}`,
      email: input.email,
      name: input.name,
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);

    const token = encodeToken({ userId: user.id, email: user.email });
    return { token, userId: user.id, email: user.email, name: user.name };
  }

  login(input: LoginDto): AuthResponse {
    const user = db.users.find((existingUser) => existingUser.email === input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = encodeToken({ userId: user.id, email: user.email });
    return { token, userId: user.id, email: user.email, name: user.name };
  }
}
