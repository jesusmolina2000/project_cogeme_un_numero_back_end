import { Test, TestingModule } from '@nestjs/testing';
import { ChoosenNumberController } from './choosen-number.controller';

describe('ChoosenNumberController', () => {
  let controller: ChoosenNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChoosenNumberController],
    }).compile();

    controller = module.get<ChoosenNumberController>(ChoosenNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
