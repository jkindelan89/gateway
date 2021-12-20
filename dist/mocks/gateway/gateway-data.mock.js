"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewaysMockData = exports.gatewayDtoToUpdate = exports.toCreateGateway = void 0;
const device_data_mock_1 = require("../device/device-data.mock");
const faker = require('faker');
exports.toCreateGateway = [];
for (let i = 0; i < 6; i++) {
    const fakerGateway = {
        "serialNumber": faker.datatype.number(),
        "name": faker.random.word(),
        "address": faker.internet.ip()
    };
    exports.toCreateGateway.push(fakerGateway);
}
exports.gatewayDtoToUpdate = {
    "serialNumber": faker.datatype.number(),
    "name": faker.random.word(),
    "address": faker.internet.ip()
};
const gatewaysMockDatat = exports.toCreateGateway.map(function (e, index) {
    return Object.assign(Object.assign({}, e), { _id: index.toString() + "bd50be8bc7208b6ce8abee", __v: 0 });
});
gatewaysMockDatat[5].devices = device_data_mock_1.devicesMockData;
gatewaysMockDatat[0].populate = (field) => {
    gatewaysMockDatat[0].devices = device_data_mock_1.devicesMockData;
};
exports.gatewaysMockData = [...gatewaysMockDatat];
//# sourceMappingURL=gateway-data.mock.js.map