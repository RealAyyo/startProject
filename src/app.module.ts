import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { SequelizeModule } from "@nestjs/sequelize";


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    HttpModule.register({
      timeout:5000,
      maxRedirects:5,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      models: [],
      autoLoadModels: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
