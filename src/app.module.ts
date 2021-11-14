import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { User } from './users/entities/user.entity';
import { Address } from './addresses/entities/address.entity';
import { GoogleStrategy } from './google.strategy';
import { SecurityMiddleware } from './security.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'passwd',
      database: process.env.DATABASE_NAME || 'test',
      entities: [Address, User],
      synchronize: true, // only for dev
      logging: true,
    }),
    UsersModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes(
        { path: 'users/*', method: RequestMethod.PATCH },
        { path: 'users/*', method: RequestMethod.DELETE },
      );
  }
}
