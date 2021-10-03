import { Test, TestingModule } from '@nestjs/testing';
import { ConstantsService } from './constants.service';

describe('ConstantsService', () => {
  let service: ConstantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstantsService],
    }).compile();

    service = module.get<ConstantsService>(ConstantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
