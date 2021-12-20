import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Device} from "./Device";
import {Document} from "mongoose";

export type GatewayDocument = Gateway & Document;

@Schema()
export class Gateway extends Document{
    @Prop({ required: true, unique:true })
    serialNumber: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true})
    address: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }] })
    devices: Device[];

}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);