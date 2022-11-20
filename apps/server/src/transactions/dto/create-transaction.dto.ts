export class CreateTransactionDto {
  id?: number;
  debitedAccountId?: number;
  creditedAccountId?: number;
  value: number;
  username?: string;
}
