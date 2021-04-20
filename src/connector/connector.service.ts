import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { FindConnectorsFilterDto } from './dto/find-connectors-filter.dto';
import { ConnectorPrivacy } from './enums/connector-privacy.enum';
import { Connector, ConnectorDocument } from './schemas/connector.schema';

@Injectable()
export class ConnectorService {
  constructor(
    @InjectModel('Connector') private connectorModel: Model<ConnectorDocument>,
  ) {}

  async find(
    filterDto: FindConnectorsFilterDto,
    request: any,
  ): Promise<Connector[]> {
    const userId = request.user._id;

    const conditions = {
      isDeleted: false,
    };
    const { name, category, type, privacy } = filterDto;

    if (name)
      Object.assign(conditions, {
        name: { $regex: '.*' + name + '.*', $options: 'i' },
      });

    if (category) Object.assign(conditions, { category });

    if (type) Object.assign(conditions, { type });

    if (!privacy || privacy === ConnectorPrivacy.PUBLIC)
      Object.assign(conditions, { privacy: ConnectorPrivacy.PUBLIC });

    if (privacy && privacy === ConnectorPrivacy.PRIVATE)
      Object.assign(conditions, {
        privacy: ConnectorPrivacy.PRIVATE,
        createdByUserId: userId,
      });

    return await this.connectorModel.find(conditions).exec();
  }

  async findOne(id: string, request: any): Promise<Connector> {
    const userId = request?.user?._id;
    const foundConnector = await this.connectorModel
      .findOne({ _id: id, createdByUserId: userId })
      .exec();

    if (!foundConnector) {
      throw new NotFoundException(`Connector with ID ${id} not found`);
    }

    return foundConnector;
  }

  async create(
    connector: CreateConnectorDto,
    request: any,
  ): Promise<Connector> {
    const userId = request.user._id;
    const newConnectorData = Object.assign(connector, {
      createdByUserId: Types.ObjectId(userId),
    });
    const newConnector = new this.connectorModel(newConnectorData);
    return await newConnector.save();
  }

  async update(
    id: string,
    connector: CreateConnectorDto,
    request: any,
  ): Promise<Connector> {
    const foundConnector = await this.findOne(id, request);

    if (foundConnector) {
      const updatedConnector = await this.connectorModel.findByIdAndUpdate(
        id,
        connector,
        {
          new: true,
        },
      );
      return updatedConnector;
    }
  }

  async delete(id: string, request: any): Promise<void> {
    const foundConnector = await this.findOne(id, request);

    if (foundConnector) {
      await this.connectorModel.findByIdAndUpdate(id, {
        isDeleted: true,
        deletedAt: new Date(),
      });
    }
  }
}
