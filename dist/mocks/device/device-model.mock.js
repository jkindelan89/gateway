"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModelMock = void 0;
const device_data_mock_1 = require("./device-data.mock");
class DeviceModelMock {
    findById(id) {
        return device_data_mock_1.devicesMockData[0];
        const device = device_data_mock_1.devicesMockData[0];
        if (device._id == id) {
            return device;
        }
    }
}
exports.DeviceModelMock = DeviceModelMock;
//# sourceMappingURL=device-model.mock.js.map