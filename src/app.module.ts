import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'asistencia', 
        retryDelay: 3000,
        autoLoadEntities: true,
        synchronize: false,
    }),    
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    PermissionsModule,
    ProfessorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
