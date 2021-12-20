import { Device } from "../../schemas/Device";
import { DeviceDTO } from "../../dto/device.dto";
import { DeviceRepository } from "../../repositories/device.repository";
export declare class DeviceService {
    private readonly repository;
    constructor(repository: DeviceRepository);
    findOne(id: string): Promise<Device>;
    update(id: string, deviceDTO: DeviceDTO): Promise<Device>;
    delete(id: string): Promise<Device>;
    status(id: string): Promise<Device>;
}
