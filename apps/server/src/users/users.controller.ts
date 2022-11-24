import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ConflictException,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  createsuccessResponse,
  exceptionError,
} from './swagger/success.response';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: createsuccessResponse,
  })
  @ApiConflictResponse({
    description: 'Username already exists',
    type: exceptionError,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'success',
    type: createsuccessResponse,
  })
  @ApiNotFoundResponse({
    description: 'Username not found!',
    type: exceptionError,
  })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
