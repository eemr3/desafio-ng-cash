import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  value: number;
}
