import * as mongoose from 'mongoose';
import { Gateway } from "./Gateway";
import { Document } from "mongoose";
export declare type DeviceDocument = Device & Document;
export declare class Device extends Document {
    uid: string;
    vendor: string;
    status: boolean;
    createdAt: Date;
    gateway: Gateway;
}
export declare const DeviceSchema: mongoose.Schema<Device, mongoose.Model<Device, any, any, any>, any>;
