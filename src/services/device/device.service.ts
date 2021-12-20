import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {Device} from "../../schemas/Device";
import {DeviceDTO} from "../../dto/device.dto";
import {DeviceRepository} from "../../repositories/device.repository";

@Injectable()
export class DeviceService {
    constructor(private readonly repository: DeviceRepository) {
    }


    async findOne(id: string): Promise<Device> {
        const result = await this.repository.findById(id);
        if (!result) {
            throw new HttpException(`The device with id: ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return result;

    }

    async update(id: string, deviceDTO: DeviceDTO): Promise<Device> {
        const result = await this.repository.findByIdAndUpdate(id, deviceDTO);
        if (!result) {
            throw new HttpException(`the device with id: ${id} could not be update`, HttpStatus.BAD_REQUEST);
        }
        return result
    }

    async delete(id: string): Promise<Device> {
        const result = await this.repository.findByIdAndDelete(id);
        if (!result) {
            throw new HttpException(`the device with id: ${id} could not be deleted`, HttpStatus.BAD_REQUEST);
        }
        return result
    }

    async status(id: string): Promise<Device> {
        let result = await this.repository.findById(id)
        if (!result) {
            throw new HttpException(`the device with id: ${id} could not be update the status`, HttpStatus.BAD_REQUEST);
        }
        result = await this.repository.findByIdAndUpdate(id, {...result, status: !result.status});
        return result

    }
}
