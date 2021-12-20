import {GatewayDTO} from "../../dto/gateway.dto";
import {devicesMockData} from "../device/device-data.mock";


const faker = require('faker');

export const toCreateGateway: GatewayDTO[] = [];
for (let i = 0; i < 6; i++) {
    const fakerGateway: GatewayDTO = {
        "serialNumber": faker.datatype.number(),
        "name": faker.random.word(),
        "address": faker.internet.ip()
    }
    toCreateGateway.push(fakerGateway);
}
export const gatewayDtoToUpdate = {
    "serialNumber": faker.datatype.number(),
    "name": faker.random.word(),
    "address": faker.internet.ip()
};

const gatewaysMockDatat: any[] = toCreateGateway.map(function (e, index) {
    return {...e, _id: index.toString() + "bd50be8bc7208b6ce8abee", __v: 0}
});
gatewaysMockDatat[5].devices = devicesMockData;
gatewaysMockDatat[0].populate = (field: String) => {
    gatewaysMockDatat[0].devices = devicesMockData;
};

export const gatewaysMockData = [...gatewaysMockDatat];