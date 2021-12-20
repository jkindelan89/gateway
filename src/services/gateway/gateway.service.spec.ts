import {Test, TestingModule} from '@nestjs/testing';
import {GatewayService} from './gateway.service';
import {GatewayRepository} from "../../repositories/gateway.repository";
import {GatewayRepositoryMock} from "../../mocks/gateway/gateway-repository.mock";
import {gatewayDtoToUpdate, gatewaysMockData, toCreateGateway} from "../../mocks/gateway/gateway-data.mock";
import {DeviceRepository} from "../../repositories/device.repository";
import {DeviceRepositoryMock} from "../../mocks/device/device-repository.mock";
import { devicesMockData, toCreateDevice} from "../../mocks/device/device-data.mock";

describe('GatewayService', () => {
    let service: GatewayService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GatewayService,
                {
                    provide: DeviceRepository,
                    useClass: DeviceRepositoryMock,
                },
                {
                    provide: GatewayRepository,
                    useClass: GatewayRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<GatewayService>(GatewayService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('get all gateways', async () => {
        const result = await service.findAll();
        expect(typeof result).toBe(typeof []);
        expect(result.length).toBe(gatewaysMockData.length);


    });

    it('find one gateway', async () => {
        const gateway = gatewaysMockData[0];
        const result = await service.findOne(gateway._id);
        expect(result).toBe(gateway)


    });
    it('cath error not found gateway', async () => {
        const id = "123456789";
        try {
            const result = await service.findOne(id);
            expect(result).toBe(null);

        } catch (e: any) {
            expect(e.status).toEqual(404);
            expect(e.message).toEqual(`Gateway not found with id: ${id}.`);
        }

    });

    it('create gateway', async () => {
        const gatewayDTO = toCreateGateway[0];
        const result = await service.create(gatewayDTO);
        expect(result).toStrictEqual(gatewaysMockData[0])

    });

    it('cath error required field: address on create gateway', async () => {
        const gatewayDTO = toCreateGateway[0];
        delete gatewayDTO.address;
        try {
            const result = await service.create(gatewayDTO);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual('Gateway not added.');
        }

    });

    it('cath error required field: name on create gateway', async () => {
        const gatewayDTO = toCreateGateway[0];
        delete gatewayDTO.name;
        try {
            const result = await service.create(gatewayDTO);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual('Gateway not added.');
        }

    });

    it('cath error required field: serialNumber on create gateway', async () => {
        const gatewayDTO = toCreateGateway[0];
        delete gatewayDTO.serialNumber;
        try {
            const result = await service.create(gatewayDTO);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual('Gateway not added.');
        }

    });

    it('update gateway', async () => {
        const gateway = gatewaysMockData[0];
        const updated = {...gateway, ...gatewayDtoToUpdate};
        const result = await service.update(gateway._id, gatewayDtoToUpdate);
        expect(result).toStrictEqual(updated)

    });

    it('cath error same serialNumber gateway', async () => {
        const gateway = gatewaysMockData[0];
        const id = gateway._id;
        const gatewayDtoToUpdateduplicateUid = {
            ...gateway, ...gatewayDtoToUpdate,
            serialNumber: gatewaysMockData[1].serialNumber
        };
        try {

            const result = await service.update(id, gatewayDtoToUpdateduplicateUid);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`Gateway with id: ${id} not update.`);
        }

    });
    it('delete gateway', async () => {
        const gateway = gatewaysMockData[0];
        const result = await service.delete(gateway._id);
        expect(result).toStrictEqual(gateway)

    });

    it('cath error on delete', async () => {
        const id = "123456";
        try {

            const result = await service.delete(id);
            expect(result).toBe(null);
        } catch (e: any) {
            expect(e.status).toEqual(400);
            expect(e.message).toEqual(`Gateway with id: ${id} not deleted.`);
        }

    });

    it('add device', async () => {
        const device = toCreateDevice[0];
        const gateway = gatewaysMockData[0];
        const result = await service.addDevice(gateway._id, device);
        expect(result.devices).toBeTruthy();
        expect(result.devices.length).toBe(1);


    });

    it('cath error required field: uid on create device', async () => {
        const device = toCreateDevice[0];
        delete device.uid;
        const gateway = gatewaysMockData[0];
        try {
            const result = await service.addDevice(gateway._id, device);
            expect(result).toBe(null);

        }
        catch (e:any){
            expect(e.status).toBe(400);
            expect(e.message).toBe('Device not added');

        }
    });

    it('cath error required field: status on create device', async () => {
        const device = toCreateDevice[0];
        delete device.status;
        const gateway = gatewaysMockData[0];
        try {
            const result = await service.addDevice(gateway._id, device);
            expect(result).toBe(null);

        }
        catch (e:any){
            expect(e.status).toBe(400);
            expect(e.message).toBe('Device not added');

        }
    });
    it('cath error required field: vendor on create device', async () => {
        const device = toCreateDevice[0];
        delete device.vendor;
        const gateway = gatewaysMockData[0];
        try {
            const result = await service.addDevice(gateway._id, device);
            expect(result).toBe(null);

        }
        catch (e:any){
            expect(e.status).toBe(400);
            expect(e.message).toBe('Device not added');

        }
    });

    it('cath error duplicate uid on create device', async () => {
        const device = toCreateDevice[0];
        const gateway = gatewaysMockData[0];
        try {
            const result = await service.addDevice(gateway._id, {...device,uid:devicesMockData[1].uid});
            expect(result).toBe(null);

        }
        catch (e:any){
            expect(e.status).toBe(400);
            expect(e.message).toBe('Device not added');

        }
    });

    it('cath error more than 10 device', async () => {
        const device = toCreateDevice[0];
        const gateway = gatewaysMockData[5];
        try {
            const result = await service.addDevice(gateway._id, {...device,uid:devicesMockData[1].uid});
            expect(result).toBe(null);

        }
        catch (e:any){
            expect(e.status).toBe(400);
            expect(e.message).toBe('The maximum number of devices that the gateway can have is 10');

        }
    });

    it('add device', async () => {

        const gateway = gatewaysMockData[0];
        const result = await service.listDevice(gateway._id);
        expect(result).toBeTruthy();
        expect(result.length).toBe(devicesMockData.length);


    });


});
