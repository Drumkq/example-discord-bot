import { CommandInteraction, GuildMember } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { ConnectionService } from '../services/music/connection.service';

@Controller
export class ConnectionController {
  constructor(private readonly connection: ConnectionService) {}

  @SlashCommand({ description: 'Leaves from the current voice channel' })
  async leave(interaction: CommandInteraction) {
    //this.connection.leave();

    await interaction.reply('On maintenance');
  }

  // eslint-disable-next-line quotes
  @SlashCommand({ description: "Joins to member's voice channel" })
  async join(interaction: CommandInteraction) {
    const guildMember = interaction.member as GuildMember;
    if (!guildMember) {
      await interaction.reply('This command only allowed in guilds');
      return;
    }

    if (!guildMember.voice.channelId) {
      await interaction.reply(
        'Join in voice channel first before use this command',
      );
      return;
    }

    if (
      !this.connection.join({
        adapterCreator: guildMember.guild.voiceAdapterCreator,
        guildId: guildMember.guild.id,
        channelId: guildMember.voice.channelId,
      })
    ) {
      await interaction.reply('Bot already joined to the channel');
      return;
    }

    await interaction.reply('Joined');
  }
}
