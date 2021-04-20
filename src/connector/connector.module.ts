import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { ConnectorSchema } from './schemas/connector.schema';
import { ConnectorSeed } from './seeds/connector.seed';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Connector', schema: ConnectorSchema }]),
    AuthModule,
    CommandModule,
  ],
  controllers: [ConnectorController],
  providers: [ConnectorService, ConnectorSeed],
})
export class ConnectorModule {}
