import { Test, TestingModule } from '@nestjs/testing';
import { ChoosenNumberService } from './choosen-number.service';

describe('ChoosenNumberService', () => {
  let service: ChoosenNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoosenNumberService],
    }).compile();

    service = module.get<ChoosenNumberService>(ChoosenNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
