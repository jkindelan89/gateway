import * as mongoose from 'mongoose';
import { Device } from "./Device";
import { Document } from "mongoose";
export declare type GatewayDocument = Gateway & Document;
export declare class Gateway extends Document {
    serialNumber: string;
    name: string;
    address: string;
    devices: Device[];
}
export declare const GatewaySchema: mongoose.Schema<Gateway, mongoose.Model<Gateway, any, any, any>, any>;
