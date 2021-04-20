import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectorModule } from './connector/connector.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConnectorModule,
    MongooseModule.forRoot(
      'mongodb+srv://fridry:12345@cluster0.so0rk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
})
export class AppModule {}
