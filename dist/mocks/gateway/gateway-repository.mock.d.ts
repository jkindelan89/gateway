import { GatewayDTO } from "../../dto/gateway.dto";
export declare class GatewayRepositoryMock {
    find(): any[];
    findById(id: string): any;
    create(gatewayDTO: GatewayDTO): any;
    findByIdAndUpdate(id: string, gatewayDTO: GatewayDTO): any;
    findByIdAndDelete(id: string): any;
}
