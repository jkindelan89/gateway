import { GatewayService } from "../../services/gateway/gateway.service";
import { GatewayDTO } from "../../dto/gateway.dto";
import { DeviceDTO } from "../../dto/device.dto";
export declare class GatewayController {
    private readonly service;
    constructor(service: GatewayService);
    index(): Promise<import("../../schemas/Gateway").Gateway[]>;
    find(id: string): Promise<any>;
    create(gatewayDTO: GatewayDTO): Promise<import("../../schemas/Gateway").Gateway>;
    update(id: string, gatewayDTO: GatewayDTO): Promise<import("../../schemas/Gateway").Gateway>;
    delete(id: string): Promise<import("../../schemas/Gateway").Gateway>;
    addDevice(id: string, deviceDTO: DeviceDTO): Promise<import("../../schemas/Gateway").Gateway>;
    listDevices(id: string): Promise<import("../../schemas/Device").Device[]>;
}
