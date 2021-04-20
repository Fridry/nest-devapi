import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { ConnectorService } from '../connector.service';
import { ConnectorType } from '../enums/connector-type.enum';
import { ConnectorPrivacy } from '../enums/connector-privacy.enum';
import { ConnectorStatus } from '../enums/connector-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectorDocument } from '../schemas/connector.schema';

@Injectable()
export class ConnectorSeed {
  constructor(
    @InjectModel('Connector') private connectorModel: Model<ConnectorDocument>,
  ) {}

  @Command({
    command: 'create:connector',
    describe: 'create a connector',
    autoExit: true,
  })
  async create(): Promise<void> {
    await this.connectorModel.insertMany([
      {
        name: 'Fake REST connector',
        type: ConnectorType.REST,
        privacy: ConnectorPrivacy.PUBLIC,
        baseUrl: 'Fakerestconnector.com.br',
        logoUrl: 'Fakerestconnector.com.br/logoUrl',
        category: 'Fake REST Connectors',
        description: 'A Fake connector',
        status: ConnectorStatus.AVAILABLE,
        isDeleted: false,
        deletedAt: null,
        createdByUserId: '607e39058ec54f990f4de793',
      },
      {
        name: 'Fake BD connector',
        type: ConnectorType.BD,
        privacy: ConnectorPrivacy.PUBLIC,
        baseUrl: 'Fakebdconnector.com.br',
        logoUrl: 'Fakebdconnector.com.br/logoUrl',
        category: 'Fake BD Connectors',
        description: 'A Fake BD connector',
        status: ConnectorStatus.AVAILABLE,
        isDeleted: false,
        deletedAt: null,
        createdByUserId: '607e39058ec54f990f4de793',
      },
      {
        name: 'Fake SOAP connector',
        type: ConnectorType.SOAP,
        privacy: ConnectorPrivacy.PUBLIC,
        baseUrl: 'Fakesoapconnector.com.br',
        logoUrl: 'Fakesoapconnector.com.br/logoUrl',
        category: 'Fake SOAP Connectors',
        description: 'A Fake SOAP connector',
        status: ConnectorStatus.AVAILABLE,
        isDeleted: false,
        deletedAt: null,
        createdByUserId: '607e39058ec54f990f4de793',
      },
    ]);
  }
}
