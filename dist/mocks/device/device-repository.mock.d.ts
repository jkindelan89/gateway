import { DeviceDTO } from "../../dto/device.dto";
export declare class DeviceRepositoryMock {
    findById(id: string): any;
    findByIdAndUpdate(id: string, deviceDTO: DeviceDTO): Promise<any>;
    findByIdAndDelete(id: string): any;
    create(deviceDTO: DeviceDTO): any;
}
