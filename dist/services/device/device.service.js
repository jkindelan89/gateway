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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const device_repository_1 = require("../../repositories/device.repository");
let DeviceService = class DeviceService {
    constructor(repository) {
        this.repository = repository;
    }
    async findOne(id) {
        const result = await this.repository.findById(id);
        if (!result) {
            throw new common_1.HttpException(`The device with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async update(id, deviceDTO) {
        const result = await this.repository.findByIdAndUpdate(id, deviceDTO);
        if (!result) {
            throw new common_1.HttpException(`the device with id: ${id} could not be update`, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async delete(id) {
        const result = await this.repository.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.HttpException(`the device with id: ${id} could not be deleted`, common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async status(id) {
        let result = await this.repository.findById(id);
        if (!result) {
            throw new common_1.HttpException(`the device with id: ${id} could not be update the status`, common_1.HttpStatus.BAD_REQUEST);
        }
        result = await this.repository.findByIdAndUpdate(id, Object.assign(Object.assign({}, result), { status: !result.status }));
        return result;
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [device_repository_1.DeviceRepository])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map