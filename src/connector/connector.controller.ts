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
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConnectorService } from './connector.service';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { FindConnectorsFilterDto } from './dto/find-connectors-filter.dto';
import { UpdateConnectorDto } from './dto/update-connector.dto';
import { Connector } from './schemas/connector.schema';

@Controller('connector')
@UseGuards(AuthGuard())
export class ConnectorController {
  constructor(private connectorServices: ConnectorService) {}

  @Get()
  find(
    @Query(ValidationPipe) filterDto: FindConnectorsFilterDto,
    @Req() request: any,
  ): Promise<Connector[]> {
    return this.connectorServices.find(filterDto, request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: any): Promise<Connector> {
    return this.connectorServices.findOne(id, request);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createConnectorDto: CreateConnectorDto,
    @Req() request: any,
  ): Promise<Connector> {
    return this.connectorServices.create(createConnectorDto, request);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateConnectorDto: UpdateConnectorDto,
    @Param('id') id: string,
    @Req() request: any,
  ): Promise<Connector> {
    return this.connectorServices.update(id, updateConnectorDto, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: any): Promise<void> {
    return this.connectorServices.delete(id, request);
  }
}
