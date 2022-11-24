import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/transactions/transactions.service';
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
      include: {
        users: true,
      },
    });

    return transaction;
  }

  async findUserName(id: number) {
    const account = await this.prisma.accounts.findFirst({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });

    return account.users[0].username;
  }

  async helpers(arr: any) {
    const credFrom = await Promise.all(
      arr.map(async (item: any) => {
        let user: any;
        if (item.debitedAccountId) {
          user = await this.findUserName(item.debitedAccountId);
          return {
            id: item.id,
            value: item.value,
            transfer: user,
            createdAt: item.createdAt,
            type: 'C',
          };
        } else {
          user = await this.findUserName(item.creditedAccountId);
          return {
            id: item.id,
            value: item.value,
            transfer: user,
            createdAt: item.createdAt,
            type: 'D',
          };
        }
      }),
    );
    return credFrom;
  }

  async findTransactionPerAccount(user: IUser) {
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
            creditedAccountId: false,
            debitedAccountId: true,
            createdAt: true,
          },
        },
        transactionDebit: {
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: false,
            createdAt: true,
          },
        },
      },
    });

    return transaction.map(async (t) => {
      return {
        id: t.id,
        balance: t.balance,
        user: t.users[0],
        'cash-in': await this.helpers(t.transactionCredit),
        'cash-out': await this.helpers(t.transactionDebit),
      };
    })[0];
  }

  async findAndFilterTransaction(user: IUser, type: { query: string }) {
    const transactionFiltered = await this.prisma.accounts.findMany({
      where: { id: user.accountId },
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
            creditedAccountId: false,
            debitedAccountId: true,
            createdAt: true,
          },
        },
        transactionDebit: {
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: false,
            createdAt: true,
          },
        },
      },
    });
    if (type.query === 'cash-in') {
      return transactionFiltered.map(async (t) => {
        return {
          id: t.id,
          balance: t.balance,
          user: t.users[0],
          'cash-in': await this.helpers(t.transactionCredit),
        };
      })[0];
    }
    return transactionFiltered.map(async (t) => {
      return {
        id: t.id,
        balance: t.balance,
        user: t.users[0],
        'cash-out': await this.helpers(t.transactionDebit),
      };
    })[0];
  }

  async findTransactionPerDate(query, user: IUser) {
    const transactions = await this.prisma.accounts.findMany({
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
          where: {
            createdAt: {
              gte: new Date(query.query),
            },
          },
          select: {
            id: true,
            value: true,
            creditedAccountId: false,
            debitedAccountId: true,
            createdAt: true,
          },
        },
        transactionDebit: {
          where: {
            createdAt: {
              gte: new Date(query.query),
            },
          },
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: false,
            createdAt: true,
          },
        },
      },
    });

    return transactions.map(async (t) => {
      return {
        id: t.id,
        balance: t.balance,
        user: t.users[0],
        'cash-in': await this.helpers(t.transactionCredit),
        'cash-out': await this.helpers(t.transactionDebit),
      };
    })[0];
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return await this.prisma.accounts.update({
      where: { id },
      data: updateAccountDto,
    });
  }
}
