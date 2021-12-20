import {Module} from '@nestjs/common';
import {GatewayController} from './controllers/gateway/gateway.controller';
import {DeviceController} from './controllers/device/device.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {GatewayService} from './services/gateway/gateway.service';
import {DeviceService} from './services/device/device.service';
import {Gateway, GatewaySchema} from "./schemas/Gateway";
import {Device, DeviceSchema} from "./schemas/Device";
import configs from "./configs/configs";
import {ConfigModule} from '@nestjs/config';
import {GatewayRepository} from "./repositories/gateway.repository";
import {DeviceRepository} from "./repositories/device.repository";

@Module({
    controllers: [GatewayController, DeviceController],
    providers: [
        GatewayService,
        DeviceService,
        GatewayRepository,
        DeviceRepository
    ],
    imports: [
        ConfigModule.forRoot({envFilePath: ['.env.dev', '.env']}),
        MongooseModule.forRoot(configs().dbUri),
        MongooseModule.forFeature([
            {name: Gateway.name, schema: GatewaySchema},
            {name: Device.name, schema: DeviceSchema}
        ]),

    ],
})
export class AppModule {

}
