"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayRepositoryMock = void 0;
const gateway_data_mock_1 = require("./gateway-data.mock");
class GatewayRepositoryMock {
    find() {
        return gateway_data_mock_1.gatewaysMockData;
    }
    findById(id) {
        const founded = gateway_data_mock_1.gatewaysMockData.find((g, index) => {
            return g._id == id;
        });
        return founded;
    }
    create(gatewayDTO) {
        const founded = gateway_data_mock_1.gatewaysMockData.find((g, index) => {
            return g.serialNumber == gatewayDTO.serialNumber && index != 0;
        });
        if (founded) {
            return null;
        }
        if (!gatewayDTO.serialNumber || !gatewayDTO.address || !gatewayDTO.name) {
            return null;
        }
        return gateway_data_mock_1.gatewaysMockData[0];
    }
    findByIdAndUpdate(id, gatewayDTO) {
        const founded = gateway_data_mock_1.gatewaysMockData.find((g) => {
            return g._id != id && g.serialNumber == gatewayDTO.serialNumber;
        });
        if (founded) {
            return null;
        }
        else {
            return Object.assign(Object.assign({}, gateway_data_mock_1.gatewaysMockData[0]), gatewayDTO);
        }
    }
    findByIdAndDelete(id) {
        const device = gateway_data_mock_1.gatewaysMockData[0];
        if (device._id == id) {
            return device;
        }
        return null;
    }
}
exports.GatewayRepositoryMock = GatewayRepositoryMock;
//# sourceMappingURL=gateway-repository.mock.js.map