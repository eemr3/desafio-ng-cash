import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

export interface RequestWithUserRole extends Request {
  user?: {
    userId: number;
    username: string;
    accountId: number;
  };
}
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTransactionDto: any,
    @Req() req: RequestWithUserRole,
  ) {
    try {
      return await this.transactionsService.create(
        createTransactionDto,
        req.user,
      );
    } catch (error) {
      if (error.message === 'Forbidden') {
        const message =
          'It is not possible to make a transfer to the same account!';
        throw new ForbiddenException(message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async findOne(@Req() req: RequestWithUserRole) {
    return await this.transactionsService.findOne(req.user);
  }
}
