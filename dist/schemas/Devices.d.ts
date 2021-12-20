import { Document } from 'mongoose';
export declare type GatewayDocument = Gateway & Document;
export declare class Gateway {
    serialNumber: string;
    name: string;
    address: string;
}
export declare const GatewaySchema: import("mongoose").Schema<Document<Gateway, any, any>, import("mongoose").Model<Document<Gateway, any, any>, any, any, any>, any>;
