import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accouts: AccountsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserName(createUserDto.username);

    if (userExists) {
      throw new Error('Username already exists!');
    }
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const user = await this.prisma.users.create({ data });
    const account = await this.accouts.create({});
    const userAccountId = await this.update(user.id, { accountId: account.id });

    return {
      id: user.id,
      username: user.username,
      accountId: userAccountId.accountId,
    };
  }

  async findAll() {
    return await this.prisma.users.findMany({ include: { Accounts: true } });
  }

  async findUserName(username: string) {
    const user = await this.prisma.users.findUnique({
      where: { username },
      select: {
        password: true,
        id: true,
        username: true,
        Accounts: { select: { id: true, balance: true } },
      },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      accountId: user.Accounts.id,
      balance: user.Accounts.balance,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findFirst({
      where: { id },
      select: {
        password: false,
        id: true,
        username: true,
        Accounts: { select: { id: false, balance: true } },
      },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found!');
    }

    const responseUpdate = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    return {
      id: responseUpdate.id,
      usermane: responseUpdate.username,
      accountId: responseUpdate.accountId,
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('Username not found!');
    }

    return await this.prisma.users.delete({ where: { id } });
  }
}
