export type User = {
  id: number,
  name: string;
  surname: string;
  email: string;
  birthDate: string;
  token: string;
  image: string;
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

