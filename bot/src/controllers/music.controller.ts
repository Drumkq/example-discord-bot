import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { StringOption } from '../decorators/slashCommands/options/stringOption';
import { ConnectionService } from '../services/music/connection.service';
import { InteractionExtension } from '../utils/interaction.extension';
import { InvalidGuildExecution } from '../exceptions/invalidExecution';
import { buildGeneralResponse } from '../utils/interaction.responses';
import { BackendService } from '../services/backend/backend.service';
import { TrackType } from '../services/backend/state/tracks/track-type.enum';

@Controller
export class MusicController {
  constructor(
    private readonly connection: ConnectionService,
    private readonly backend: BackendService,
  ) {}

  @SlashCommand({
    description: 'Adds a new song to the guild queue',
    options: [new StringOption('url', 'Url to the YouTube video', true)],
  })
  async play(interaction: CommandInteraction) {
    const url = InteractionExtension.getOption<string>(interaction, 'url');

    const member = InteractionExtension.getGuildMember(interaction);

    if (!member.voice.channel) {
      throw Error('You have to join the voice channel first');
    }

    this.connection.join({
      adapterCreator: member.guild.voiceAdapterCreator,
      guildId: member.guild.id,
      channelId: member.voice.channel.id,
    });

    const player = this.connection.players.get(member.guild.id);
    if (!player) {
      return;
    }

    await player.addTrack({ url, type: TrackType.YOUTUBE });
    const audios = !player.player.checkPlayable()
      ? await player.play()
      : await player.getQueue();
    if (audios === undefined) {
      interaction.editReply('No audio to play');
      return;
    }

    const { current, next } = audios;
    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder())
          .setTitle(current.video_details.title || '')
          .setURL(current.video_details.url)
          .setAuthor({
            name: current.video_details.channel?.name || '',
            url: current.video_details.channel?.url || '',
            iconURL: current.video_details.channel?.icons?.at(0)?.url || '',
          })
          .setThumbnail(current.video_details.thumbnails.at(0)?.url)
          .setFields(
            {
              name: 'Duration',
              value: current.video_details.durationRaw,
              inline: true,
            },
            {
              name: 'Views',
              value: current.video_details.views.toString(),
              inline: true,
            },
            {
              name: 'Likes',
              value: current.video_details.likes.toString(),
              inline: true,
            },
            {
              name: 'Next audio',
              value: next?.video_details.title || 'No audio',
              inline: false,
            },
          )
          .setImage(next?.video_details.thumbnails.at(0)?.url || null),
      ],
    });
  }

  @SlashCommand({ description: 'Skips playing track in the guild queue' })
  async skip(interaction: CommandInteraction) {
    if (!interaction.guildId) {
      throw new InvalidGuildExecution();
    }

    const player = this.connection.players.get(interaction.guildId);
    if (!player) {
      return;
    }

    await player.stop();
    const audios = await player.play();
    if (audios === undefined) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle(
            'No audio in queue!',
          ),
        ],
      });

      return;
    }

    const { current, next } = audios;
    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder())
          .setTitle(current.video_details.title || '')
          .setURL(current.video_details.url)
          .setAuthor({
            name: current.video_details.channel?.name || '',
            url: current.video_details.channel?.url || '',
            iconURL: current.video_details.channel?.icons?.at(0)?.url || '',
          })
          .setThumbnail(current.video_details.thumbnails.at(0)?.url)
          .setFields(
            {
              name: 'Duration',
              value: current.video_details.durationRaw,
              inline: true,
            },
            {
              name: 'Views',
              value: current.video_details.views.toString(),
              inline: true,
            },
            {
              name: 'Likes',
              value: current.video_details.likes.toString(),
              inline: true,
            },
            {
              name: 'Next audio',
              value: next?.video_details.title || 'No audio',
              inline: false,
            },
          )
          .setImage(next?.video_details.thumbnails.at(0)?.url || null),
      ],
    });
  }

  @SlashCommand({ description: 'Enables loop' })
  async repeat(interaction: CommandInteraction) {
    const player = this.connection.players.get(
      InteractionExtension.getGuild(interaction).id,
    );
    if (!player) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle(
            'Bot is not in the voice channel',
          ),
        ],
      });

      return;
    }

    player.isRepeat = !player.isRepeat;

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle(
          player.isRepeat ? 'Repeat enabled' : 'Repeat disabled',
        ),
      ],
    });
  }

  @SlashCommand({
    description: 'Stops audio player and clears the guild queue',
  })
  async stop(interaction: CommandInteraction) {
    const guildId = InteractionExtension.getGuild(interaction).id;
    const player = this.connection.players.get(guildId);
    if (!player) {
      return;
    }

    player.stop();
    this.connection.leave(guildId);

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Stopped')],
    });
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async pause(interaction: CommandInteraction) {
    const player = this.connection.players.get(
      InteractionExtension.getGuild(interaction).id,
    );
    if (!player) {
      return;
    }
    player.pause();

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Paused')],
    });
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async unpause(interaction: CommandInteraction) {
    const player = this.connection.players.get(
      InteractionExtension.getGuild(interaction).id,
    );
    if (!player) {
      return;
    }

    player.unpause();

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Unpaused')],
    });
  }

  @SlashCommand({
    description: 'Clears audio queue',
  })
  async clear(interaction: CommandInteraction) {
    const player = this.connection.players.get(
      InteractionExtension.getGuild(interaction).id,
    );
    if (!player) {
      return;
    }

    player.clear();

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle(
          'The queue has been cleared',
        ),
      ],
    });
  }
}
