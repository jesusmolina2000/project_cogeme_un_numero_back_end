import { Test, TestingModule } from '@nestjs/testing';
import { RaffleDateService } from './raffle-date.service';

describe('RaffleDateService', () => {
  let service: RaffleDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaffleDateService],
    }).compile();

    service = module.get<RaffleDateService>(RaffleDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
