import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createTransactionDto: any, @Req() req: any) {
    try {
      return await this.transactionsService.create(
        createTransactionDto,
        req.user,
      );
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async findOne(@Req() req: any) {
    try {
      return await this.transactionsService.findOne(req.user);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
