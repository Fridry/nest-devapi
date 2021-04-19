import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { FindConnectorsFilterDto } from './dto/find-connectors-filter.dto';
import { UpdateConnectorDto } from './dto/update-connector.dto';
import { Connector } from './schemas/connector.schema';

@Controller('connector')
export class ConnectorController {
  constructor(private connectorServices: ConnectorService) {}

  @Get()
  find(
    @Query(ValidationPipe) filterDto: FindConnectorsFilterDto,
  ): Promise<Connector[]> {
    console.log(filterDto);

    return this.connectorServices.find(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Connector> {
    return this.connectorServices.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createConnectorDto: CreateConnectorDto,
  ): Promise<Connector> {
    return this.connectorServices.create(createConnectorDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateConnectorDto: UpdateConnectorDto,
    @Param('id') id: string,
  ): Promise<Connector> {
    return this.connectorServices.update(id, updateConnectorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.connectorServices.delete(id);
  }
}
