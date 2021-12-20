import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {GatewayRepository} from "../src/repositories/gateway.repository";
import {GatewayRepositoryMock} from "../src/mocks/gateway/gateway-repository.mock";
import {gatewayDtoToUpdate, gatewaysMockData, toCreateGateway} from "../src/mocks/gateway/gateway-data.mock";
import {DeviceRepository} from "../src/repositories/device.repository";
import {DeviceRepositoryMock} from "../src/mocks/device/device-repository.mock";
import {devicesMockData, toCreateDevice} from "../src/mocks/device/device-data.mock";

describe('GatewayController (e2e)', () => {
    let app: INestApplication;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(GatewayRepository)
            .useClass(GatewayRepositoryMock)
            .overrideProvider(DeviceRepository)
            .useClass(DeviceRepositoryMock)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('gateway(GET)', () => {
        return request(app.getHttpServer())
            .get('/gateway')
            .expect(200)
            .expect(JSON.stringify(gatewaysMockData));
    });

    it('gateway(GET)', () => {
        const gateway =  gatewaysMockData[0];
        return request(app.getHttpServer())
            .get(`/gateway/${gateway._id}`)
            .expect(200)
            .expect(JSON.stringify(gateway));
    });

    it('gateway(POST)', () => {
        const gateway =  toCreateGateway[0];
        return request(app.getHttpServer())
            .post(`/gateway`)
            .send(gateway)
            .expect(201)
            .expect(JSON.stringify(gatewaysMockData[0]));
    });
    it('gateway(POST) error required serialNumber', () => {
        const gateway =  {...toCreateGateway[0]};
        delete gateway.serialNumber;
        return request(app.getHttpServer())
            .post(`/gateway`)
            .send(gateway)
            .expect(400)
            .expect('{"statusCode":400,"message":["serialNumber should not be empty"],"error":"Bad Request"}');
    });

    it('gateway(POST) error required name', () => {
        const gateway =  {...toCreateGateway[0]};
        delete gateway.name;
        return request(app.getHttpServer())
            .post(`/gateway`)
            .send(gateway)
            .expect(400)
            .expect('{"statusCode":400,"message":["name should not be empty"],"error":"Bad Request"}');
    });

    it('gateway (POST) error required address', () => {
        const gateway =  {...toCreateGateway[0]};
        delete gateway.address;
        return request(app.getHttpServer())
            .post(`/gateway`)
            .send(gateway)
            .expect(400)
            .expect('{"statusCode":400,"message":["address must be an ip address","address should not be empty"],"error":"Bad Request"}');
    });
    it('gateway (POST) error invalid address', () => {
        const gateway =  {...toCreateGateway[0]};
       gateway.address="1.1.1";
        return request(app.getHttpServer())
            .post(`/gateway`)
            .send(gateway)
            .expect(400)
            .expect('{"statusCode":400,"message":["address must be an ip address"],"error":"Bad Request"}');
    });

    it('gateway (PUT)', () => {
        const gateway =  gatewaysMockData[0];
        return request(app.getHttpServer())
            .put(`/gateway/${gateway._id}\``)
            .send(gatewayDtoToUpdate)
            .expect(200)
            .expect(JSON.stringify({...gateway,...gatewayDtoToUpdate}));
    });

    it('gateway (PUT) error duplicate serialNumber', () => {
        const gateway =  gatewaysMockData[0];
        return request(app.getHttpServer())
            .put(`/gateway/${gateway._id}\``)
            .send({...gatewayDtoToUpdate, serialNumber:gatewaysMockData[1].serialNumber})
            .expect(400)
            .expect('{"statusCode":400,"message":"Gateway with id: 0bd50be8bc7208b6ce8abee` not update.","error":"Bad Request"}');
    });

    it('gateway (DELETE)', () => {
        const gateway =  gatewaysMockData[0];
        return request(app.getHttpServer())
            .delete(`/gateway/${gateway._id}`)
            .expect(200)
            .expect(JSON.stringify(gatewaysMockData[0]));
    });

    it('gateway add device (POST)', () => {
        const device = toCreateDevice[0];
        const gateway = gatewaysMockData[0];
        return request(app.getHttpServer())
            .post(`/gateway/${gateway._id}/device`)
            .send(device)
            .expect(201)

    });

    it('gateway list device (GET)', () => {
        const gateway = gatewaysMockData[0];
        return request(app.getHttpServer())
            .get(`/gateway/${gateway._id}/device`)
            .expect(200)
            .expect(JSON.stringify(devicesMockData))

    });
});
