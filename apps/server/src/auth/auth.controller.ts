import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { successResponse } from './swagger/success.response';

@Controller()
@ApiTags('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiOkResponse({
    type: successResponse,
  })
  @ApiBody({ type: LoginDto })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
