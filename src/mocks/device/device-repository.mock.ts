import { devicesMockData} from "./device-data.mock";
import {DeviceDTO} from "../../dto/device.dto";

import {gatewaysMockData} from "../gateway/gateway-data.mock";

export class DeviceRepositoryMock {

    findById(id: string){
        const device = devicesMockData[0];
        if (device._id ==id){
            return device;
        }
        return null;
    }

    async findByIdAndUpdate(id: string, deviceDTO: DeviceDTO) {
        const founded = devicesMockData.find((d)=>{
          return d._id != id && d.uid == deviceDTO.uid;
        })
        if(founded ){
            return null
        }
        else {
           return  {...devicesMockData[0], ... deviceDTO};
        }

    }
    findByIdAndDelete(id: string){
        const device = devicesMockData[0];
        if (device._id ==id){
            return device;
        }
        return null;
    }

    create(deviceDTO: DeviceDTO) {

        const founded = devicesMockData.find((g, index) => {
            return g.uid == deviceDTO.uid && index != 0;
        })
        if (founded) {
            return null;
        }
        if (!deviceDTO.uid || deviceDTO.status==null ||  deviceDTO.status==undefined || !deviceDTO.vendor || !deviceDTO.createdAt) {
            return null
        }
        gatewaysMockData[0].devices = [devicesMockData[0]];
        return devicesMockData[0];
    }

}