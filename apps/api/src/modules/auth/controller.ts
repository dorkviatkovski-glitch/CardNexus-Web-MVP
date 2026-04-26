import { AuthService } from "./service";
import type { LoginDto, SignupDto } from "./dto";

const service = new AuthService();

export const AuthController = {
  signup: (input: SignupDto) => service.signup(input),
  login: (input: LoginDto) => service.login(input),
};
