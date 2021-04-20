import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ConnectorService } from '../connector.service';
import { ConnectorSeed } from './connector.seed';

@Module({
  imports: [CommandModule],
  providers: [ConnectorSeed, ConnectorService],
  exports: [ConnectorSeed],
})
export class SeedsModule {}
