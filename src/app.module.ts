import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'asistencia', 
        retryDelay: 3000,
        autoLoadEntities: true,
        synchronize: false,
      })
    }),    
    TypeOrmModule.forFeature([Users]),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
