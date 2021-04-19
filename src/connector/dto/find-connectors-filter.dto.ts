import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ConnectorPrivacy } from '../enums/connector-privacy.enum';
import { ConnectorType } from '../enums/connector-type.enum';

export class FindConnectorsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsIn([ConnectorType.BD, ConnectorType.REST, ConnectorType.SOAP])
  type: ConnectorType;

  @IsOptional()
  @IsIn([ConnectorPrivacy.PUBLIC, ConnectorPrivacy.PRIVATE])
  privacy: ConnectorPrivacy;
}
