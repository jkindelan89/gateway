import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import {GatewayService} from "../../services/gateway/gateway.service";
import {GatewayServiceMock} from "../../mocks/gateway/gateway-service.mock";


describe('GatewayController', () => {
  let controller: GatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        { provide: GatewayService, useClass: GatewayServiceMock },
        GatewayServiceMock
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
