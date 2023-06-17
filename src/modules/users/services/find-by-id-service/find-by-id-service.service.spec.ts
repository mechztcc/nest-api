import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdServiceService } from './find-by-id-service.service';

describe('FindByIdServiceService', () => {
  let service: FindByIdServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByIdServiceService],
    }).compile();

    service = module.get<FindByIdServiceService>(FindByIdServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
