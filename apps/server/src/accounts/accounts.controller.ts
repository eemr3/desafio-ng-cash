import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUserRole } from 'src/transactions/transactions.controller';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  findOne(@Req() req: any) {
    return this.accountsService.findOne(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/filter/transactions')
  async findAndFilterTransaction(
    @Query() query,
    @Req() req: RequestWithUserRole,
  ) {
    return await this.accountsService.findAndFilterTransaction(req.user, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/filter/transaction/date')
  async findTransactionPerDate(
    @Query() query,
    @Req() req: RequestWithUserRole,
  ) {
    return await this.accountsService.findTransactionPerDate(query, req.user);
  }
}
