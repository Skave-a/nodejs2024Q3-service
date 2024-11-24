import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные для регистрации',
  })
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body.login, body.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логин и получение Access и Refresh токенов' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Успешный логин', type: Object })
  @ApiResponse({ status: 400, description: 'Некорректные данные для входа' })
  @ApiResponse({ status: 403, description: 'Неверные учетные данные' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.login, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Обновление Access токена с использованием Refresh токена',
  })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({
    status: 200,
    description: 'Access токен обновлен',
    type: Object,
  })
  @ApiResponse({ status: 401, description: 'Отсутствует Refresh токен' })
  @ApiResponse({
    status: 403,
    description: 'Неверный или истекший Refresh токен',
  })
  async refresh(@Body() body: RefreshDto) {
    if (!body.refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }
    return this.authService.refreshToken(body.refreshToken);
  }
}
