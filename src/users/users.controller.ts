import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('logout')
  async logout(@Body() body: { userId: number }) {
    const { userId } = body;
    await this.usersService.logout(userId);
    // Aquí puedes retornar un mensaje de éxito
    return { message: 'Logout successful' };
  }
}
