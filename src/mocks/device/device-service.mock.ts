import {devicesMockData} from "./device-data.mock";
import {HttpException, HttpStatus} from "@nestjs/common";

export class DeviceServiceMock{
    findOne(id:String){
        const d = devicesMockData.find((d)=>{
            return d._id==id;
        })
        if(!d){
            throw new HttpException(`The device with id: ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return d;
    }

    status(id:String){
        const d = devicesMockData.find((d)=>{
            return d._id==id;
        })
        if(!d){
            throw new HttpException(`the device with id: ${id} could not be update the status`, HttpStatus.BAD_REQUEST);
        }
        return {...d,status:!d.status};
    }

    update(id, deviceDTO){
        const d = devicesMockData.find((d)=>{
            return d._id==id;
        })
        return {...d,...deviceDTO};
    }
    delete(id:String){
        const d = devicesMockData.find((d)=>{
            return d._id==id;
        })
        if(!d){
            throw new HttpException(`the device with id: ${id} could not be deleted`, HttpStatus.BAD_REQUEST);
        }
        return d;
    }
}