export interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  name: string;
  surname: string;
  email: string;
  birthDate: string;
}