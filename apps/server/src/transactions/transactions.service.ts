import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountService: AccountsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user) {
    const userResponse = await this.usersService.findUserName(
      createTransactionDto.username,
    );
    const account = await this.accountService.findOne(user.userId);

    if (user.userId === userResponse.id) {
      throw new Error(
        'It is not possible to make a transfer to the same account!',
      );
    }

    if (
      Number(Number(account.balance) < createTransactionDto.value) ||
      Number(account.balance) <= 0
    ) {
      throw new Error(' Insufficient balance to carry out the transaction');
    }

    const transaction = await this.prisma.transactions.create({
      data: {
        creditedAccountId: userResponse.accountId,
        debitedAccountId: user.userId,
        value: createTransactionDto.value,
      },
    });

    await this.accountService.update(userResponse.accountId, {
      balance: account.balance + createTransactionDto.value,
    });
    await this.accountService.update(user.userId, {
      balance: account.balance - createTransactionDto.value,
    });
    return {
      ...transaction,
    };
  }

  findAll() {
    return this.prisma.transactions.findMany();
  }

  async findOne(user) {
    // if (id !== user) {
    //   throw new Error(
    //     'This account is not allowed to view data from another account!',
    //   );
    // }

    const transaction = await this.accountService.findTransactionPerAccount(
      user,
    );

    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return updateTransactionDto;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
