import { Test, TestingModule } from '@nestjs/testing';
import { CreateBankAccountService } from './create-bank-account.service';

describe('CreateBankAccountService', () => {
  let service: CreateBankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBankAccountService],
    }).compile();

    service = module.get<CreateBankAccountService>(CreateBankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
