import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConnectorPrivacy } from '../enums/connector-privacy.enum';
import { ConnectorStatus } from '../enums/connector-status.enum';
import { ConnectorType } from '../enums/connector-type.enum';

export type ConnectorDocument = Connector & Document;

@Schema()
export class Connector {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: [ConnectorType.BD, ConnectorType.REST, ConnectorType.SOAP],
  })
  type: string;

  @Prop({
    enum: [ConnectorPrivacy.PUBLIC, ConnectorPrivacy.PRIVATE],
    default: ConnectorPrivacy.PUBLIC,
  })
  privacy: string;

  @Prop({ required: true })
  baseUrl: string;

  @Prop()
  logoUrl: string;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop({
    enum: [ConnectorStatus.AVAILABLE, ConnectorStatus.UNAVAILABLE],
    default: ConnectorStatus.AVAILABLE,
  })
  status: string;
}

export const ConnectorSchema = SchemaFactory.createForClass(Connector);
