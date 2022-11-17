import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserName(createUserDto.username);
    if (userExists) {
      throw new Error('Username already exists!');
    }
    const user = await this.prismaService.users.create({ data: createUserDto });
    return user;
  }

  async findAll() {
    return await this.prismaService.users.findMany();
  }

  async findUserName(username: string) {
    return await this.prismaService.users.findUnique({ where: { username } });
  }

  async findOne(id: number) {
    const user = await this.prismaService.users.findFirst({
      where: { id },
      select: { password: false, id: true, username: true },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.users.delete({ where: { id } });
  }
}
