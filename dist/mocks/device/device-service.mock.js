"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceServiceMock = void 0;
const device_data_mock_1 = require("./device-data.mock");
const common_1 = require("@nestjs/common");
class DeviceServiceMock {
    findOne(id) {
        const d = device_data_mock_1.devicesMockData.find((d) => {
            return d._id == id;
        });
        if (!d) {
            throw new common_1.HttpException(`The device with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return d;
    }
    status(id) {
        const d = device_data_mock_1.devicesMockData.find((d) => {
            return d._id == id;
        });
        if (!d) {
            throw new common_1.HttpException(`the device with id: ${id} could not be update the status`, common_1.HttpStatus.BAD_REQUEST);
        }
        return Object.assign(Object.assign({}, d), { status: !d.status });
    }
    update(id, deviceDTO) {
        const d = device_data_mock_1.devicesMockData.find((d) => {
            return d._id == id;
        });
        return Object.assign(Object.assign({}, d), deviceDTO);
    }
    delete(id) {
        const d = device_data_mock_1.devicesMockData.find((d) => {
            return d._id == id;
        });
        if (!d) {
            throw new common_1.HttpException(`the device with id: ${id} could not be deleted`, common_1.HttpStatus.BAD_REQUEST);
        }
        return d;
    }
}
exports.DeviceServiceMock = DeviceServiceMock;
//# sourceMappingURL=device-service.mock.js.map