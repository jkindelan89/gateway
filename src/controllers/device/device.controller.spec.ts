import {Test, TestingModule} from '@nestjs/testing';
import {DeviceController} from './device.controller';
import {DeviceService} from "../../services/device/device.service";
import {DeviceServiceMock} from "../../mocks/device/device-service.mock";
import {deviceDtoToUpdate, devicesMockData} from "../../mocks/device/device-data.mock";


describe('DeviceController', () => {
    let controller: DeviceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DeviceController],
            providers: [
                {provide: DeviceService, useClass: DeviceServiceMock},
                DeviceServiceMock
            ],
        }).compile();

        controller = module.get<DeviceController>(DeviceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('search by id', async  () => {
        const device = devicesMockData[0];
        const result = await controller.find(device._id);
        expect(result).toBe(device)
    });

    it('cath error not found device', async () => {
        const id = "123456789";
        try {
            const result = await controller.find(id);
            expect(result).toBe(null);

        } catch (e: any) {
            expect(e.status).toEqual(404);
            expect(e.message).toEqual(`The device with id: ${id} not found`);
        }
    });

    it('update device\'status', async () => {
        const device = devicesMockData[0];
        const result = await controller.status(device._id);
        expect(result).toStrictEqual({...device,status:!device.status})
    });

    it('cath error on update device\'status', async () => {
        const id = "123456";
        try {
            const result = await controller.status(id);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`the device with id: ${id} could not be update the status`);
        }

    });
    it('update device', async () => {
        const device = devicesMockData[0];
        const updated = {...device, ... deviceDtoToUpdate};
        const result = await controller.update(device._id,deviceDtoToUpdate);
        expect(result).toStrictEqual(updated)

    });
    it('delete device', async () => {
        const device = devicesMockData[0];
        const result = await controller.delete(device._id);
        expect(result).toStrictEqual(device)

    });

});
