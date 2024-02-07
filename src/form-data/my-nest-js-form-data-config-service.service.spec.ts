import { Test, TestingModule } from '@nestjs/testing';
import { MyNestJsFormDataConfigService } from './my-nest-js-form-data-config-service.service';

describe('MyNestJsFormDataConfigServiceService', () => {
  let service: MyNestJsFormDataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyNestJsFormDataConfigService],
    }).compile();

    service = module.get<MyNestJsFormDataConfigService>(
      MyNestJsFormDataConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
