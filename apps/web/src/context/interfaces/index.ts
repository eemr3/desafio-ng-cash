export interface Transaction {
  id: number;
  value: string;
  transfer: string;
  createdAt: string;
  type: string;
}

export interface IUser {
  id: number;
  username: string;
}

export interface ICash {
  id: number;
  value: string;
  transfer: string;
  createdAt: string;
  type: string;
}

export interface DataTransfer {
  id: number;
  balance: number;
  user: IUser;
  'cash-in': ICash[];
  'cash-out': ICash[];
}

export interface TransactionProps {
  transactions: Transaction[];
  data: DataTransfer;
}
