export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
}