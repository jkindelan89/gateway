import {Device, DeviceDocument} from "../schemas/Device";
import { Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DeviceDTO} from "../dto/device.dto";

@Injectable()
export class DeviceRepository {

    constructor(@InjectModel(Device.name) private readonly model: Model<DeviceDocument>) {
    }

    async findById(id: string): Promise<Device> {
        try {
            return await this.model.findById(id).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }

    }

    async findByIdAndUpdate(id: string, deviceDTO: DeviceDTO): Promise<Device> {
        try {
            return await this.model.findByIdAndUpdate(id, deviceDTO).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null
        }
    }

    async findByIdAndDelete(id: string): Promise<Device> {
        try {
            return await this.model.findByIdAndDelete(id).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null
        }
    }

    async create(device: any): Promise<Device> {
        return await new this.model(device).save();
    }
}
