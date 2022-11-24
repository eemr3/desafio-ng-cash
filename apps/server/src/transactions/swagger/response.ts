import { ApiProperty } from '@nestjs/swagger';

class user {
  @ApiProperty()
  id: number;
  @ApiProperty()
  usermane: string;
}
class transactions {
  @ApiProperty()
  id: number;
  @ApiProperty()
  value: string;
  @ApiProperty()
  transfer: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  type: string;
}

export class getReponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  user: user;
  @ApiProperty({ isArray: true })
  'cash-in': transactions;
  @ApiProperty({ isArray: true })
  'cash-out': transactions;
}

export class successCreated {
  @ApiProperty()
  id: number;
  @ApiProperty()
  debitedAccountId: number;
  @ApiProperty()
  creditedAccountId: number;
  @ApiProperty()
  value: string;
  @ApiProperty()
  createdAt: string;
}
