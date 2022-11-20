import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccountDto) {
    const account = await this.prisma.accounts.create({ data });
    return account;
  }

  async findAll() {
    return await this.prisma.accounts.findMany();
  }

  async findOne(id: number) {
    const transaction = await this.prisma.accounts.findFirst({
      where: {
        id,
      },
    });

    return transaction;
  }
  async findTransactionPerAccount(user) {
    const transaction = await this.prisma.accounts.findMany({
      where: {
        id: user.accountId,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            password: false,
            accountId: false,
          },
        },
        transactionCredit: {
          select: {
            id: true,
            value: true,
            creditedAccountId: !null ? true : false,
            debitedAccountId: !null ? true : false,
            createdAt: true,
          },
        },
        transactionDebit: {
          select: {
            id: true,
            value: true,
            creditedAccountId: !null ? true : false,
            debitedAccountId: !null ? true : false,
            createdAt: true,
          },
        },
      },
    });

    return transaction.map((t) => ({
      id: t.id,
      balance: t.balance,
      user: t.users[0],
      'cash-in': [...t.transactionCredit],
      'cash-out': [...t.transactionDebit],
    }))[0];
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return await this.prisma.accounts.update({
      where: { id },
      data: updateAccountDto,
    });
  }
}
