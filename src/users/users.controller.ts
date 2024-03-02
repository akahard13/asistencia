import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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

    const token = this.generateToken(user); // Generar token JWT
    return { user, token }; // Devolver usuario y token en la respuesta
  }

  private generateToken(user: Users) {
    const payload = { username: user.username, sub: user.id }; // Información a incluir en el token
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' }); // Generar token JWT
  }

  @Post('logout')
  async logout(@Body() body: { userId: number }) {
    const { userId } = body;
    await this.usersService.logout(userId);
    // Aquí puedes retornar un mensaje de éxito
    return { message: 'Logout successful' };
  }
}
/*updated*/