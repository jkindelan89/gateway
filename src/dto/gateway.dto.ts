import {IsIP, IsNotEmpty} from "class-validator";

export class GatewayDTO{

    @IsNotEmpty()
    serialNumber: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsIP(4)
    address: string;


}