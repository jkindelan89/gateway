import {IsNotEmpty} from "class-validator";

export class DeviceDTO {
    @IsNotEmpty()
    uid: string;
    @IsNotEmpty()
    vendor: string;
    @IsNotEmpty()
    status: boolean;
    createdAt?: Date;

}