import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Repository,EntityManager, DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class UsersService {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
       ) {}

       async create(createUserDto: CreateUserDto) {
        const { cod, fullname, email, password, cellphone, grade, isProfessor, isAdmin } = createUserDto;
        const result = await this.dataSource.query(
            `INSERT INTO users (cod, fullname, email, password, cellphone, grade, isProfessor, isAdmin, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            [cod, fullname, email, password, cellphone, grade, isProfessor, isAdmin]
        );
        const response = await this.dataSource.query(
            `SELECT * FROM users WHERE cod = ?`,
            [cod]
        );


        Logger.log(response);
        return { data: response};
    }

    /*async findByCod(cod: string): Promise<Users> {
        const user = await Users.findOne({ where: { cod: cod } });
        if (!user) {
            throw new NotFoundException(`User with code ${cod} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<Users> {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }*/
}
