import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { ConnectionService } from '../services/music/connection.service';
import { InteractionExtension } from '../utils/interaction.extension';
import { buildGeneralResponse } from '../utils/interaction.responses';

@Controller
export class ConnectionController {
  constructor(private readonly connection: ConnectionService) {}

  @SlashCommand({ description: 'Leaves from the current voice channel' })
  async leave(interaction: CommandInteraction) {
    const guild = InteractionExtension.getGuild(interaction);
    this.connection.leave(guild.id);

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Leaved!')],
    });
  }

  // eslint-disable-next-line quotes
  @SlashCommand({ description: "Joins to member's voice channel" })
  async join(interaction: CommandInteraction) {
    const guildMember = InteractionExtension.getGuildMember(interaction);

    if (!guildMember.voice.channelId) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle(
            'Join in voice channel first before use this command',
          ),
        ],
      });
      return;
    }

    if (
      !this.connection.join({
        adapterCreator: guildMember.guild.voiceAdapterCreator,
        guildId: guildMember.guild.id,
        channelId: guildMember.voice.channelId,
      })
    ) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle(
            'Bot already joined to the channel',
          ),
        ],
      });
      return;
    }

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Joined!')],
    });
  }
}
