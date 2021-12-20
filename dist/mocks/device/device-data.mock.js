"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicesMockData = exports.deviceDtoToUpdate = exports.toCreateDevice = void 0;
const faker = require('faker');
exports.toCreateDevice = [];
for (let i = 0; i < 10; i++) {
    const fakeDevice = {
        "uid": faker.datatype.uuid(),
        "vendor": faker.commerce.productName(),
        "status": faker.datatype.boolean(),
    };
    exports.toCreateDevice.push(fakeDevice);
}
exports.deviceDtoToUpdate = {
    "uid": faker.datatype.uuid(),
    "vendor": faker.commerce.productName(),
    "status": faker.datatype.boolean(),
};
exports.devicesMockData = exports.toCreateDevice.map(function (e, index) {
    return Object.assign(Object.assign({}, e), { _id: index.toString() + "bd50be8bc7208b6ce8abde", __v: 0 });
});
//# sourceMappingURL=device-data.mock.js.map