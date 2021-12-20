import { Gateway, GatewayDocument } from "../schemas/Gateway";
import { Model } from "mongoose";
import { GatewayDTO } from "../dto/gateway.dto";
export declare class GatewayRepository {
    private readonly model;
    constructor(model: Model<GatewayDocument>);
    find(): Promise<Gateway[]>;
    findById(id: string): Promise<Gateway>;
    findByIdAndUpdate(id: string, gatewayDTO: GatewayDTO): Promise<Gateway>;
    findByIdAndDelete(id: string): Promise<Gateway>;
    create(gateway: any): Promise<Gateway>;
}
