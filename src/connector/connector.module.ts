import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { ConnectorSchema } from './schemas/connector.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Connector', schema: ConnectorSchema }]),
  ],
  controllers: [ConnectorController],
  providers: [ConnectorService],
})
export class ConnectorModule {}
