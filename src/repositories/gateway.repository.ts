import {Gateway, GatewayDocument} from "../schemas/Gateway";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {GatewayDTO} from "../dto/gateway.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class GatewayRepository {

    constructor(
        @InjectModel(Gateway.name) private readonly model: Model<GatewayDocument>
    ) {
    }

    async find(): Promise<Gateway[]> {
        try {
            return await this.model.find().exec();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }
    }

    async findById(id: string): Promise<Gateway> {
        try {
            return await this.model.findById(id).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }
    }

    async findByIdAndUpdate(id: string, gatewayDTO: GatewayDTO): Promise<Gateway> {
        try {
            return await this.model.findByIdAndUpdate(id, gatewayDTO).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }
    }

    async findByIdAndDelete(id: string): Promise<Gateway> {
        try {
            return await this.model.findByIdAndDelete(id).exec();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }
    }

    async create(gateway: any): Promise<Gateway> {
        try {
            return await new this.model(gateway).save();
        } catch (error: any) {
            TypeError(error.message);
            return null;
        }
    }
}