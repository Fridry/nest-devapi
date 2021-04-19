import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { Connector } from './schemas/connector.schema';

@Controller('connector')
export class ConnectorController {
  constructor(private connectorServices: ConnectorService) {}

  @Get()
  findAll(): Promise<Connector[]> {
    return this.connectorServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Connector> {
    return this.connectorServices.findOne(id);
  }

  @Post()
  async create(
    @Body() createConnectorDto: CreateConnectorDto,
  ): Promise<Connector> {
    return this.connectorServices.create(createConnectorDto);
  }

  @Put(':id')
  async update(
    @Body() updateConnectorDto: CreateConnectorDto,
    @Param('id') id: string,
  ): Promise<Connector> {
    return this.connectorServices.update(id, updateConnectorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.connectorServices.delete(id);
  }
}
