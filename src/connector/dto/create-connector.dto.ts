import {
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsString,
  IsOptional,
  IsIn,
} from 'class-validator';

import { ConnectorPrivacy } from '../enums/connector-privacy.enum';
import { ConnectorStatus } from '../enums/connector-status.enum';
import { ConnectorType } from '../enums/connector-type.enum';

export class CreateConnectorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([ConnectorType.BD, ConnectorType.REST, ConnectorType.SOAP])
  type: ConnectorType;

  @IsString()
  @IsOptional()
  @IsIn([ConnectorPrivacy.PUBLIC, ConnectorPrivacy.PRIVATE])
  privacy: ConnectorPrivacy;

  @IsString()
  @IsNotEmpty()
  baseUrl: string;

  @IsString()
  @IsOptional()
  logoUrl: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsIn([ConnectorStatus.AVAILABLE, ConnectorStatus.UNAVAILABLE])
  status: ConnectorStatus;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
