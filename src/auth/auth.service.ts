import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import { TokenPayload } from './tokenPayload.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
      private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
    ) {}
 
    public async register(registrationData: RegisterDto) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      var id ='3';
      try {
        //registrationData.password = hashedPassword;
        const createdUser = await this.usersService.create({
  ...registrationData,
  id: id
});
        createdUser.password = undefined;
        return createdUser;
      } catch (error) {
        // if (error?.code === PostgresErrorCode.UniqueViolation) {
        //   throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        // }
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.usersService.getByEmail(email);
         // await this.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }
       
      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }
      public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }
      public getCookieWithJwtToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
      }
  }