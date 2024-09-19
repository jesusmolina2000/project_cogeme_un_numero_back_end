import { Test, TestingModule } from '@nestjs/testing';
import { RaffleDateController } from './raffle-date.controller';

describe('RaffleDateController', () => {
  let controller: RaffleDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaffleDateController],
    }).compile();

    controller = module.get<RaffleDateController>(RaffleDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
