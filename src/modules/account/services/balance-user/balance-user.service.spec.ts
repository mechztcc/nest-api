import { Test, TestingModule } from '@nestjs/testing';
import { BalanceUserService } from './balance-user.service';

describe('BalanceUserService', () => {
  let service: BalanceUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceUserService],
    }).compile();

    service = module.get<BalanceUserService>(BalanceUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
