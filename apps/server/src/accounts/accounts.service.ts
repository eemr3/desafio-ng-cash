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
    return await this.prisma.accounts.findFirst({ where: { id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return await this.prisma.accounts.update({
      where: { id },
      data: updateAccountDto,
    });
  }
}
