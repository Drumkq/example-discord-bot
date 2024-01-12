import { Test, TestingModule } from '@nestjs/testing';
import { GuildStateService } from './guild-state.service';

describe('GuildStateService', () => {
  let service: GuildStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildStateService],
    }).compile();

    service = module.get<GuildStateService>(GuildStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
