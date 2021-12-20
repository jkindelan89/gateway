import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {DeviceRepository} from "../src/repositories/device.repository";
import {DeviceRepositoryMock} from "../src/mocks/device/device-repository.mock";
import {deviceDtoToUpdate, devicesMockData} from "../src/mocks/device/device-data.mock";

describe('DeviceController (e2e)', () => {
    let app: INestApplication;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(DeviceRepository)
            .useClass(DeviceRepositoryMock)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('device(GET)', () => {
        const device =  devicesMockData[0];
        return request(app.getHttpServer())
            .get(`/device/${device._id}`)
            .expect(200)
            .expect(JSON.stringify(device));
    });

    it('device(PUT)', () => {
        const device =  devicesMockData[0];
        const updated = {...device, ... deviceDtoToUpdate};

        return request(app.getHttpServer())
            .put(`/device/${device._id}`)
            .send(deviceDtoToUpdate)
            .expect(200)
            .expect(JSON.stringify(updated));
    });

    it('device(PUT) error field uid required', () => {
        const device =  devicesMockData[0];
        const tuUpdate = {...deviceDtoToUpdate}
        delete tuUpdate.uid
        return request(app.getHttpServer())
            .put(`/device/${device._id}`)
            .send(tuUpdate)
            .expect(400)
            .expect('{"statusCode":400,"message":["uid should not be empty"],"error":"Bad Request"}')
    });

    it('device(PUT) error field status required', () => {
        const device =  devicesMockData[0];
        const tuUpdate = {...deviceDtoToUpdate}
        delete tuUpdate.status
        return request(app.getHttpServer())
            .put(`/device/${device._id}`)
            .send(tuUpdate)
            .expect(400)
            .expect('{"statusCode":400,"message":["status should not be empty"],"error":"Bad Request"}')
    });

    it('device(PUT) error field vendor required', () => {
        const device =  devicesMockData[0];
        const tuUpdate = {...deviceDtoToUpdate}
        delete tuUpdate.vendor
        return request(app.getHttpServer())
            .put(`/device/${device._id}`)
            .send(tuUpdate)
            .expect(400)
            .expect('{"statusCode":400,"message":["vendor should not be empty"],"error":"Bad Request"}')
    });

    it('device(PUT) error duplicate uid', () => {
        const device = devicesMockData[0];
        const deviceDtoToUpdateduplicateUid = {...device, ... deviceDtoToUpdate,uid:devicesMockData[1].uid};
        return request(app.getHttpServer())
            .put(`/device/${device._id}`)
            .send(deviceDtoToUpdateduplicateUid)
            .expect(400)
            .expect('{"statusCode":400,"message":"the device with id: 0bd50be8bc7208b6ce8abde could not be update"}')
    });


});
