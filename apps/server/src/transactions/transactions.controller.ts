import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { getReponse, successCreated } from './swagger/response';
import { exceptionError } from 'src/users/swagger/success.response';

export interface RequestWithUserRole extends Request {
  user?: {
    userId: number;
    username: string;
    accountId: number;
  };
}
@Controller('transactions')
@ApiBearerAuth()
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiCreatedResponse({ type: successCreated })
  @ApiForbiddenResponse({
    description: 'It is not possible to make a transfer to the same account!',
    type: exceptionError,
  })
  @ApiNotFoundResponse({ description: 'User not found!', type: exceptionError })
  @ApiBadRequestResponse({
    description: 'Insufficient balance to carry out the transactio',
    type: exceptionError,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: exceptionError,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto | undefined,
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
      if (error.message === 'NotFound') {
        const message = 'User not found!';
        throw new NotFoundException(message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @ApiOkResponse({ type: getReponse })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: exceptionError,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async findOne(@Req() req: RequestWithUserRole) {
    return await this.transactionsService.findOne(req.user);
  }
}
