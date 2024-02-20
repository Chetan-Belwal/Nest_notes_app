import { Test, TestingModule } from '@nestjs/testing';
import { UserCliService } from './user-cli.service';

describe('UserCliService', () => {
  let service: UserCliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCliService],
    }).compile();

    service = module.get<UserCliService>(UserCliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
