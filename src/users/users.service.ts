import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  async register(createUserDto: CreateUserDto): Promise<Users> {
    const {id_professor, username, password} = createUserDto;
    Logger.log(username,password, id_professor)
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.dataSource.query(
      `INSERT INTO users (id_professor, username, password,  created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [id_professor, username, hashedPassword ]
    );
    const id = result.insertId;
    const user = await this.dataSource.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<Users> {
    Logger.log(loginUserDto);
    const { username, password } = loginUserDto;
    const [user] = await this.dataSource.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }
  

  async logout(userId: number): Promise<void> {
    // Implementar lógica de cierre de sesión si es necesario
  }
}
