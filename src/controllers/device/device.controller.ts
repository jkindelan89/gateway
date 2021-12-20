import {Body, Controller, Delete, Get, Param, Put} from '@nestjs/common';
import {DeviceService} from "../../services/device/device.service";
import {DeviceDTO} from "../../dto/device.dto";

@Controller('device')
export class DeviceController {
    constructor(private readonly service: DeviceService) {}

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Put(':id/status')
    async status(@Param('id') id: string) {
        return await this.service.status(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() deviceDTO: DeviceDTO) {
        return await this.service.update(id, deviceDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }
}
