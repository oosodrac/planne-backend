import { Test, TestingModule } from '@nestjs/testing';
import { BaldeFrutaService } from './balde-fruta.service';

describe('BaldeFrutaService', () => {
  let service: BaldeFrutaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaldeFrutaService],
    }).compile();

    service = module.get<BaldeFrutaService>(BaldeFrutaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
