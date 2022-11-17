import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserName(createUserDto.username);
    if (userExists) {
      throw new Error('Username already exists!');
    }
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const user = await this.prismaService.users.create({ data });

    return user;
  }

  async findAll() {
    return await this.prismaService.users.findMany();
  }

  async findUserName(username: string) {
    const user = await this.prismaService.users.findUnique({
      where: { username },
    });
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.prismaService.users.findFirst({
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

    return await this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found!');
    }

    return await this.prismaService.users.delete({ where: { id } });
  }
}
