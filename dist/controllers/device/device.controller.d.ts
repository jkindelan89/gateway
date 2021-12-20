import { DeviceService } from "../../services/device/device.service";
import { DeviceDTO } from "../../dto/device.dto";
export declare class DeviceController {
    private readonly service;
    constructor(service: DeviceService);
    find(id: string): Promise<import("../../schemas/Device").Device>;
    status(id: string): Promise<import("../../schemas/Device").Device>;
    update(id: string, deviceDTO: DeviceDTO): Promise<import("../../schemas/Device").Device>;
    delete(id: string): Promise<import("../../schemas/Device").Device>;
}
