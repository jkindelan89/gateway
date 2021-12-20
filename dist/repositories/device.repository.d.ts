import { Device, DeviceDocument } from "../schemas/Device";
import { Model } from "mongoose";
import { DeviceDTO } from "../dto/device.dto";
export declare class DeviceRepository {
    private readonly model;
    constructor(model: Model<DeviceDocument>);
    findById(id: string): Promise<Device>;
    findByIdAndUpdate(id: string, deviceDTO: DeviceDTO): Promise<Device>;
    findByIdAndDelete(id: string): Promise<Device>;
    create(device: any): Promise<Device>;
}
