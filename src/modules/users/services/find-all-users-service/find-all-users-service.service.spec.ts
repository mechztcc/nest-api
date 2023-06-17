import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersServiceService } from './find-all-users-service.service';

describe('FindAllUsersServiceService', () => {
  let service: FindAllUsersServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllUsersServiceService],
    }).compile();

    service = module.get<FindAllUsersServiceService>(
      FindAllUsersServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
