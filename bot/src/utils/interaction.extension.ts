import {
  CommandInteraction,
  Guild,
  GuildMember,
  VoiceBasedChannel,
} from 'discord.js';
import { InvalidOption } from '../exceptions/invalidOption';
import { InvalidGuildExecution } from '../exceptions/invalidExecution';

export class InteractionExtension {
  public static getOption<T>(
    interaction: CommandInteraction,
    optionName: string,
  ) {
    const option = interaction.options.get(optionName);
    if (option === null) {
      throw new InvalidOption(optionName);
    }

    return option.value as T;
  }

  public static getMemberOption(
    interaction: CommandInteraction,
    optionName: string,
  ) {
    const member = interaction.options.getMember(optionName);
    if (member === null) {
      throw new InvalidOption(optionName);
    }
  }

  public static getUserOption(
    interaction: CommandInteraction,
    optionName: string,
  ) {
    const user = interaction.options.getUser(optionName);
    if (user === null) {
      throw new InvalidOption(optionName);
    }
  }

  public static isInGuild(interaction: CommandInteraction): boolean {
    return interaction.guild !== null && interaction.guildId !== null;
  }

  public static getGuild(interaction: CommandInteraction): Guild {
    const guild = interaction.guild;
    if (!guild) {
      throw new InvalidGuildExecution();
    }

    return guild;
  }

  public static getGuildMember(interaction: CommandInteraction): GuildMember {
    const member = interaction.member as GuildMember;
    if (member === null) {
      throw new InvalidGuildExecution();
    }

    return member;
  }

  public static getMemberVoiceChannel(
    interaction: CommandInteraction,
  ): VoiceBasedChannel | null {
    const member = this.getGuildMember(interaction);
    return member.voice.channel;
  }

  public static async freezeReply(
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.deferReply();
  }
}
