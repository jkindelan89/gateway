"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_controller_1 = require("./controllers/gateway/gateway.controller");
const device_controller_1 = require("./controllers/device/device.controller");
const mongoose_1 = require("@nestjs/mongoose");
const gateway_service_1 = require("./services/gateway/gateway.service");
const device_service_1 = require("./services/device/device.service");
const Gateway_1 = require("./schemas/Gateway");
const Device_1 = require("./schemas/Device");
const configs_1 = require("./configs/configs");
const config_1 = require("@nestjs/config");
const gateway_repository_1 = require("./repositories/gateway.repository");
const device_repository_1 = require("./repositories/device.repository");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [gateway_controller_1.GatewayController, device_controller_1.DeviceController],
        providers: [
            gateway_service_1.GatewayService,
            device_service_1.DeviceService,
            gateway_repository_1.GatewayRepository,
            device_repository_1.DeviceRepository
        ],
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env'] }),
            mongoose_1.MongooseModule.forRoot((0, configs_1.default)().dbUri),
            mongoose_1.MongooseModule.forFeature([
                { name: Gateway_1.Gateway.name, schema: Gateway_1.GatewaySchema },
                { name: Device_1.Device.name, schema: Device_1.DeviceSchema }
            ]),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map