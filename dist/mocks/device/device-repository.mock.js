"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRepositoryMock = void 0;
const device_data_mock_1 = require("./device-data.mock");
const gateway_data_mock_1 = require("../gateway/gateway-data.mock");
class DeviceRepositoryMock {
    findById(id) {
        const device = device_data_mock_1.devicesMockData[0];
        if (device._id == id) {
            return device;
        }
        return null;
    }
    async findByIdAndUpdate(id, deviceDTO) {
        const founded = device_data_mock_1.devicesMockData.find((d) => {
            return d._id != id && d.uid == deviceDTO.uid;
        });
        if (founded) {
            return null;
        }
        else {
            return Object.assign(Object.assign({}, device_data_mock_1.devicesMockData[0]), deviceDTO);
        }
    }
    findByIdAndDelete(id) {
        const device = device_data_mock_1.devicesMockData[0];
        if (device._id == id) {
            return device;
        }
        return null;
    }
    create(deviceDTO) {
        const founded = device_data_mock_1.devicesMockData.find((g, index) => {
            return g.uid == deviceDTO.uid && index != 0;
        });
        if (founded) {
            return null;
        }
        if (!deviceDTO.uid || deviceDTO.status == null || deviceDTO.status == undefined || !deviceDTO.vendor || !deviceDTO.createdAt) {
            return null;
        }
        gateway_data_mock_1.gatewaysMockData[0].devices = [device_data_mock_1.devicesMockData[0]];
        return device_data_mock_1.devicesMockData[0];
    }
}
exports.DeviceRepositoryMock = DeviceRepositoryMock;
//# sourceMappingURL=device-repository.mock.js.map