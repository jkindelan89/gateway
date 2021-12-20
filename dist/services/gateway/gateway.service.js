"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const device_repository_1 = require("../../repositories/device.repository");
const gateway_repository_1 = require("../../repositories/gateway.repository");
let GatewayService = class GatewayService {
    constructor(gatewayRepository, deviceRepository) {
        this.gatewayRepository = gatewayRepository;
        this.deviceRepository = deviceRepository;
    }
    async findAll() {
        return await this.gatewayRepository.find();
    }
    async findOne(id) {
        const r = await this.gatewayRepository.findById(id);
        if (!r) {
            throw new common_1.NotFoundException(`Gateway not found with id: ${id}.`);
        }
        return r;
    }
    async create(gatewayDTO) {
        const r = await this.gatewayRepository.create(Object.assign({}, gatewayDTO));
        if (!r) {
            throw new common_1.BadRequestException(`Gateway not added.`);
        }
        return r;
    }
    async update(id, gatewayDTO) {
        const r = await this.gatewayRepository.findByIdAndUpdate(id, gatewayDTO);
        if (!r) {
            throw new common_1.BadRequestException(`Gateway with id: ${id} not update.`);
        }
        return r;
    }
    async delete(id) {
        const r = await this.gatewayRepository.findByIdAndDelete(id);
        if (!r) {
            throw new common_1.BadRequestException(`Gateway with id: ${id} not deleted.`);
        }
        return r;
    }
    async addDevice(id, deviceDTO) {
        const gateway = await this.findOne(id);
        if (gateway.devices && gateway.devices.length >= 10) {
            throw new common_1.HttpException('The maximum number of devices that the gateway can have is 10', common_1.HttpStatus.BAD_REQUEST);
        }
        const d = await this.deviceRepository.create(Object.assign(Object.assign({}, deviceDTO), { gateway: id, createdAt: new Date() }));
        if (!d) {
            throw new common_1.HttpException('Device not added', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.findOne(id);
    }
    async listDevice(id) {
        const gateway = await this.findOne(id);
        await gateway.populate("devices");
        return gateway.devices;
    }
};
GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gateway_repository_1.GatewayRepository,
        device_repository_1.DeviceRepository])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map