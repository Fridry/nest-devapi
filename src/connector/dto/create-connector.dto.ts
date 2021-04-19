import { ConnectorPrivacy } from '../enums/connector-privacy.enum';
import { ConnectorStatus } from '../enums/connector-status.enum';
import { ConnectorType } from '../enums/connector-type.enum';

export class CreateConnectorDto {
  readonly name: string;

  readonly type: ConnectorType;

  readonly privacy: ConnectorPrivacy;

  readonly baseUrl: string;

  readonly logoUrl: string;

  readonly category: string;

  readonly description: string;

  readonly status: ConnectorStatus;
}
