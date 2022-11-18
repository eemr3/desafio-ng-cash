import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AccountsService],
  exports: [UsersModule],
})
export class UsersModule {}
