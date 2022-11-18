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
    const account = await this.accouts.create({});
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      accountId: account.id,
    };
    const user = await this.prisma.users.create({ data });

    return user;
  }

  async findAll() {
    return await this.prisma.users.findMany({ include: { Accounts: true } });
  }

  async findUserName(username: string) {
    return await this.prisma.users.findUnique({
      where: { username },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findFirst({
      where: { id },
      select: { password: false, id: true, username: true },
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

    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found!');
    }

    return await this.prisma.users.delete({ where: { id } });
  }
}
