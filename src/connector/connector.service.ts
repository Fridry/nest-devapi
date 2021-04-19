import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { FindConnectorsFilterDto } from './dto/find-connectors-filter.dto';
import { Connector, ConnectorDocument } from './schemas/connector.schema';

@Injectable()
export class ConnectorService {
  constructor(
    @InjectModel('Connector') private connectorModel: Model<ConnectorDocument>,
  ) {}

  async find(filterDto: FindConnectorsFilterDto): Promise<Connector[]> {
    const conditions = { isDeleted: false };
    const { name, category, type, privacy } = filterDto;

    if (name)
      Object.assign(conditions, { name: { $regex: name, $options: 'i' } });

    if (category) Object.assign(conditions, { category });

    if (type) Object.assign(conditions, { type });

    if (privacy) Object.assign(conditions, { privacy });

    return await this.connectorModel.find(conditions).exec();
  }

  async findOne(id: string): Promise<Connector> {
    const foundConnector = await this.connectorModel.findById(id).exec();

    if (!foundConnector) {
      throw new NotFoundException(`Connector with ID ${id} not found`);
    }

    return foundConnector;
  }

  async create(connector: CreateConnectorDto): Promise<Connector> {
    const newConnector = new this.connectorModel(connector);
    return await newConnector.save();
  }

  async update(id: string, connector: CreateConnectorDto): Promise<Connector> {
    const foundConnector = await this.findOne(id);

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

  async delete(id: string): Promise<void> {
    const foundConnector = await this.findOne(id);

    if (foundConnector) {
      await this.connectorModel.findByIdAndUpdate(id, {
        isDeleted: true,
        deletedAt: new Date(),
      });
    }
  }
}
