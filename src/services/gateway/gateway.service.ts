import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Gateway} from "../../schemas/Gateway";
import {GatewayDTO} from "../../dto/gateway.dto";
import {DeviceDTO} from "../../dto/device.dto";
import {Device} from "../../schemas/Device";
import {DeviceRepository} from "../../repositories/device.repository";
import {GatewayRepository} from "../../repositories/gateway.repository";

@Injectable()
export class GatewayService {
    constructor(
        private readonly gatewayRepository: GatewayRepository,
        private readonly deviceRepository: DeviceRepository,
    ) {
    }

    async findAll(): Promise<Gateway[]> {
        return await this.gatewayRepository.find();

    }

    async findOne(id: string): Promise<any> {
        const r = await this.gatewayRepository.findById(id);
        if (!r) {
            throw new NotFoundException(`Gateway not found with id: ${id}.`);
        }
        return r;
    }

    async create(gatewayDTO: GatewayDTO): Promise<Gateway> {
        const r = await this.gatewayRepository.create({...gatewayDTO});
        if (!r) {
            throw new BadRequestException(`Gateway not added.`);
        }
        return r;

    }

    async update(id: string, gatewayDTO: GatewayDTO): Promise<Gateway> {
        const r = await this.gatewayRepository.findByIdAndUpdate(id, gatewayDTO);
        if (!r) {
            throw new BadRequestException(`Gateway with id: ${id} not update.`);
        }
        return r;

    }

    async delete(id: string): Promise<Gateway> {
        const r = await this.gatewayRepository.findByIdAndDelete(id);
        if (!r) {
            throw new BadRequestException(`Gateway with id: ${id} not deleted.`);
        }
        return r;

    }

    async addDevice(id: string, deviceDTO: DeviceDTO): Promise<Gateway> {
        const gateway = await this.findOne(id);
        if (gateway.devices && gateway.devices.length >= 10) {
            throw new HttpException('The maximum number of devices that the gateway can have is 10', HttpStatus.BAD_REQUEST);
        }
        const d = await this.deviceRepository.create({
            ...deviceDTO,
            gateway: id,
            createdAt: new Date(),
        });
        if (!d) {
            throw new HttpException('Device not added', HttpStatus.BAD_REQUEST);
        }
        return await this.findOne(id);
    }

    async listDevice(id: string): Promise<Device[]> {
        const gateway = await this.findOne(id);
        await gateway.populate("devices");
        return gateway.devices;
    }


}
