import { Collection } from 'discord.js';
import { Service } from '../../decorators/service.decorator';

@Service
export class SlashCommandCooldownService {
  private readonly cooldowns = new Collection<
    string,
    Collection<string, number>
  >();

  public updateCooldown(userId: string, command: string) {
    let cooldowns = this.cooldowns.get(userId);
    if (!cooldowns) {
      this.cooldowns.set(userId, new Collection());
      cooldowns = this.cooldowns.get(userId)!;
    }

    cooldowns.set(command, Date.now());
  }

  public getElapsedSeconds(userId: string, command: string) {
    const cooldowns = this.cooldowns.get(userId);
    if (!cooldowns) {
      return undefined;
    }

    const cooldown = cooldowns.get(command);
    if (!cooldown) {
      return undefined;
    }

    return Date.now() - cooldown;
  }
}
