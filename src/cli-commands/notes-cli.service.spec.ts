import { Test, TestingModule } from '@nestjs/testing';
import { NotesCliService } from './notes-cli.service';

describe('NotesCliService', () => {
  let service: NotesCliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesCliService],
    }).compile();

    service = module.get<NotesCliService>(NotesCliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
