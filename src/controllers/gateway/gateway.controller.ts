import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {GatewayService} from "../../services/gateway/gateway.service";
import {GatewayDTO} from "../../dto/gateway.dto";
import {DeviceDTO} from "../../dto/device.dto";

@Controller('gateway')
export class GatewayController {

    constructor(private readonly service: GatewayService) {}

    @Get()
    async index() {
        return await this.service.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() gatewayDTO: GatewayDTO) {
        return await this.service.create(gatewayDTO);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() gatewayDTO: GatewayDTO) {
        return await this.service.update(id, gatewayDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }

    @Post(':id/device')
    async addDevice(@Param('id') id: string,@Body() deviceDTO: DeviceDTO) {
        return await this.service.addDevice(id,deviceDTO);
    }

    @Get(':id/device')
    async listDevices(@Param('id') id: string) {
        return await this.service.listDevice(id);
    }
}
