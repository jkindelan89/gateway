import {DeviceDTO} from "../../dto/device.dto";

const faker = require('faker');

export const toCreateDevice:DeviceDTO[]=[];
for (let i=0;i<10;i++){
    const fakeDevice:DeviceDTO = {
        "uid":  faker.datatype.uuid(),
        "vendor":  faker.commerce.productName(),
        "status": faker.datatype.boolean(),
    }
    toCreateDevice.push(fakeDevice);
}
export const deviceDtoToUpdate:DeviceDTO = {
    "uid":  faker.datatype.uuid(),
    "vendor":  faker.commerce.productName(),
    "status": faker.datatype.boolean(),
};

export const devicesMockData:any[] = toCreateDevice.map(function (e,index){
    return {...e,_id:index.toString()+"bd50be8bc7208b6ce8abde",__v:0}
});