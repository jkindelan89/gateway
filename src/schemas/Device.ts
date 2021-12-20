import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Gateway} from "./Gateway";
import {Document} from "mongoose";

export type DeviceDocument = Device & Document;

@Schema()
export class Device extends Document{

    @Prop({ required: true , unique:true })
    uid: string;

    @Prop({ required: true })
    vendor: string;

    @Prop({ default:true})
    status: boolean;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
    gateway: Gateway;

}

export const DeviceSchema = SchemaFactory.createForClass(Device);