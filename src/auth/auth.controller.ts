import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';

import { LogInDto } from './dto/login.dto';
import { LoginResponse } from './dto/login.response';
import JwtRefreshGuard from './jwt-refresh.guards';
import { UserService } from 'src/user/user.service';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService : UserService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(
    @Body() loginDto: LogInDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { user } = request;
    const token = this.authService.getJwtToken(user.id);
    const refreshToken = this.authService.getJwtRefreshToken(user.id);
    var loginResponse = new LoginResponse(token,refreshToken);
    var result = response.send(loginResponse);
    return result;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    
    await this.userService.removeRefreshToken(request.user.id);
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('current-user')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
   const accessTokenCookie = this.authService.getJwtRefreshToken(request.user.id);
 
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
  
}
