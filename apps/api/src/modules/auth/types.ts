export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  name: string;
}
