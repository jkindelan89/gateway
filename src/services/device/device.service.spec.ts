import {Test, TestingModule} from '@nestjs/testing';
import {DeviceService} from './device.service';

import {deviceDtoToUpdate, devicesMockData} from "../../mocks/device/device-data.mock";
import {DeviceRepositoryMock} from "../../mocks/device/device-repository.mock";
import {DeviceRepository} from "../../repositories/device.repository";

describe('DeviceService', () => {
    let service: DeviceService;
    let repository: DeviceRepository;
    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeviceService,
                {
                    provide: DeviceRepository,
                    useClass: DeviceRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<DeviceService>(DeviceService);
        repository = module.get<DeviceRepository>(DeviceRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('find one device', async () => {
        const device = devicesMockData[0];
        const spy = jest.spyOn(repository, 'findById');
        const result = await service.findOne(device._id);
        expect(result).toBe(device)
        expect(spy).toBeCalled();


    });
    it('cath error not found device', async () => {
        const id = "123456789";
        try {
            const result = await service.findOne(id);
            expect(result).toBe(null);

        } catch (e: any) {
            expect(e.status).toEqual(404);
            expect(e.message).toEqual(`The device with id: ${id} not found`);
        }

    });

    it('update device', async () => {
        const device = devicesMockData[0];
        const updated = {...device, ... deviceDtoToUpdate};
        const result = await service.update(device._id,deviceDtoToUpdate);
        expect(result).toStrictEqual(updated)

    });

    it('cath error same uid device', async () => {
        const device = devicesMockData[0];
        const id = device._id;
        const deviceDtoToUpdateduplicateUid = {...device, ... deviceDtoToUpdate,uid:devicesMockData[1].uid};
        try {

            const result = await service.update(id,deviceDtoToUpdateduplicateUid);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`the device with id: ${id} could not be update`);
        }

    });

    it('delete device', async () => {
        const device = devicesMockData[0];
        const result = await service.delete(device._id);
        expect(result).toStrictEqual(device)

    });

    it('cath error on delete', async () => {
        const id = "123456";
        try {

            const result = await service.delete(id);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`the device with id: ${id} could not be deleted`);
        }

    });
    it('update device\'status', async () => {
        const device = devicesMockData[0];
        const result = await service.status(device._id);
        expect(result).toStrictEqual({...device,status:!device.status})
    });

    it('cath error on update device\'status', async () => {
        const id = "123456";
        try {
            const result = await service.status(id);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`the device with id: ${id} could not be update the status`);
        }

    });

});
