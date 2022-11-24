import { ApiProperty } from '@nestjs/swagger';

class users {
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

export class accountResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  users: users;
  @ApiProperty({ isArray: true })
  'cash-?': transactions;
}

export class filterReponseDate {
  @ApiProperty()
  id: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  users: users;
  @ApiProperty({ isArray: true })
  'cash-in': transactions;
  @ApiProperty({ isArray: true })
  'cash-out': transactions;
}
