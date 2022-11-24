import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUserRole } from 'src/transactions/transactions.controller';
import { exceptionError } from 'src/users/swagger/success.response';
import { AccountsService } from './accounts.service';
import { accountResponse, filterReponseDate } from './swagger/account.response';

@Controller('accounts')
@ApiBearerAuth()
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/filter/transactions')
  @ApiResponse({
    status: 200,
    description:
      'End-poit reponsalvel por retornar dados das transações conforme filtro "cash-in" / "cash-out"',
    type: accountResponse,
  })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    description: 'cash-id or cash-out',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: exceptionError,
  })
  async findAndFilterTransaction(
    @Query() query,
    @Req() req: RequestWithUserRole,
  ) {
    return await this.accountsService.findAndFilterTransaction(req.user, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/filter/transaction/date')
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'ex: 2022-11-23',
  })
  @ApiResponse({
    status: 200,
    description:
      'End-poit reponsalvel por retornar dados das transações conforme filtro por data"',
    type: filterReponseDate,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: exceptionError,
  })
  async findTransactionPerDate(
    @Query() query: string,
    @Req() req: RequestWithUserRole,
  ) {
    return await this.accountsService.findTransactionPerDate(query, req.user);
  }
}
