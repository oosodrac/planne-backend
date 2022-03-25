import { Test, TestingModule } from '@nestjs/testing';
import { BaldeFrutaController } from './balde-fruta.controller';

describe('BaldeFrutaController', () => {
  let controller: BaldeFrutaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaldeFrutaController],
    }).compile();

    controller = module.get<BaldeFrutaController>(BaldeFrutaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
