import { Test, TestingModule } from '@nestjs/testing';
import { GuildStateController } from './guild-state.controller';

describe('GuildStateController', () => {
  let controller: GuildStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuildStateController],
    }).compile();

    controller = module.get<GuildStateController>(GuildStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
