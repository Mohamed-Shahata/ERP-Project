export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthPayload {
  accessToken: string;
}

export interface AuthMessage {
  message: string;
}
