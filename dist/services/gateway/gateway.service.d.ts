import { Gateway } from "../../schemas/Gateway";
import { GatewayDTO } from "../../dto/gateway.dto";
import { DeviceDTO } from "../../dto/device.dto";
import { Device } from "../../schemas/Device";
import { DeviceRepository } from "../../repositories/device.repository";
import { GatewayRepository } from "../../repositories/gateway.repository";
export declare class GatewayService {
    private readonly gatewayRepository;
    private readonly deviceRepository;
    constructor(gatewayRepository: GatewayRepository, deviceRepository: DeviceRepository);
    findAll(): Promise<Gateway[]>;
    findOne(id: string): Promise<any>;
    create(gatewayDTO: GatewayDTO): Promise<Gateway>;
    update(id: string, gatewayDTO: GatewayDTO): Promise<Gateway>;
    delete(id: string): Promise<Gateway>;
    addDevice(id: string, deviceDTO: DeviceDTO): Promise<Gateway>;
    listDevice(id: string): Promise<Device[]>;
}
