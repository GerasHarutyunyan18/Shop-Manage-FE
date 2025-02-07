import { Currencies } from "./enums";

export type User = {
  id: number,
  name: string;
  surname: string;
  email: string;
  rate: number;
  birthDate: string;
  token: string;
  image: string;
  role: string;
};

export type Market = {
  id: number,
  name: string;
  address: string;
  createdAt: string;
  workingTimeStart: string;
  workingTimeEnd: string;
  image: string
  owner?: User;
  workersCount?: number
  totalBalance: any
};

export type Product = {
  id: number,
  name: string;
  image: string
  count: number;
  price: number;
  countMethod: string
  currency: Currencies
}