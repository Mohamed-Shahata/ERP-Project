export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  image: string;
  role: string;
}

export enum UserGender {
  MALE = "male",
  FEMALE = "female",
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
