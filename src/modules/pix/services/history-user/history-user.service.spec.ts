import { Test, TestingModule } from '@nestjs/testing';
import { HistoryUserService } from './history-user.service';

describe('HistoryUserService', () => {
  let service: HistoryUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryUserService],
    }).compile();

    service = module.get<HistoryUserService>(HistoryUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
