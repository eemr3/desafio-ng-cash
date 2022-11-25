import { ApiProperty } from '@nestjs/swagger';

export class successResponse {
  @ApiProperty({
    example: 'token',
  })
  token: string;
}
