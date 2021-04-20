import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectorModule } from './connector/connector.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.so0rk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    AuthModule,
    ConnectorModule,
  ],
})
export class AppModule {}
