import { ApiProperty } from '@nestjs/swagger';

export class createsuccessResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  usarmane: string;
  @ApiProperty()
  accountId: number;
}

export class exceptionError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
