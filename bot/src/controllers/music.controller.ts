import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { StringOption } from '../decorators/slashCommands/options/stringOption';
import { ConnectionService } from '../services/music/connection.service';
import { InteractionExtension } from '../utils/interaction.extension';
import { PlayerService } from '../services/music/player.service';
import { InvalidGuildExecution } from '../exceptions/invalidExecution';
import { UrlQueueService } from '../services/music/urlQueue.service';
import { buildGeneralResponse } from '../utils/interaction.responses';

@Controller
export class MusicController {
  constructor(
    private readonly player: PlayerService,
    private readonly urls: UrlQueueService,
    private readonly connection: ConnectionService,
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

    await interaction.deferReply();

    this.connection.join({
      adapterCreator: member.guild.voiceAdapterCreator,
      guildId: member.guild.id,
      channelId: member.voice.channel.id,
    });

    this.urls.addUrl(member.guild.id, { type: 'youtube', url: url });
    const audios = await this.player.play(member.guild.id, false);
    if (audios === undefined) {
      interaction.editReply('No audio to play');
      return;
    }

    const { currentAudio, nextAudio } = audios;
    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder())
          .setTitle(currentAudio.info.title)
          .setURL(currentAudio.info.urlToAudio)
          .setAuthor({
            name: currentAudio.info.authorName || '',
            url: currentAudio.info.urlToAuthor,
            iconURL: currentAudio.info.authorIcon || '',
          })
          .setThumbnail(currentAudio.info.icon)
          .setFields(
            {
              name: 'Duration',
              value: currentAudio.info.duration,
              inline: true,
            },
            {
              name: 'Views',
              value: currentAudio.info.views.toString(),
              inline: true,
            },
            {
              name: 'Likes',
              value: currentAudio.info.likes.toString(),
              inline: true,
            },
            {
              name: 'Next audio',
              value: nextAudio?.info.title || 'No audio',
              inline: false,
            },
          )
          .setImage(nextAudio?.info.icon || null),
      ],
    });
  }

  @SlashCommand({ description: 'Skips playing track in the guild queue' })
  async skip(interaction: CommandInteraction) {
    if (!interaction.guildId) {
      throw new InvalidGuildExecution();
    }

    await interaction.deferReply();

    const audios = await this.player.play(interaction.guildId, true);
    if (!audios) {
      this.player.stop();

      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle(
            'No audio in queue!',
          ),
        ],
      });

      return;
    }

    const { currentAudio, nextAudio } = audios;

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder())
          .setTitle(currentAudio.info.title)
          .setURL(currentAudio.info.urlToAudio)
          .setAuthor({
            name: currentAudio.info.authorName || '',
            url: currentAudio.info.urlToAuthor,
            iconURL: currentAudio.info.authorIcon,
          })
          .setThumbnail(currentAudio.info.icon)
          .setFields(
            {
              name: 'Duration',
              value: currentAudio.info.duration,
              inline: true,
            },
            {
              name: 'Views',
              value: currentAudio.info.views.toString(),
              inline: true,
            },
            {
              name: 'Likes',
              value: currentAudio.info.likes.toString(),
              inline: true,
            },
            {
              name: 'Next audio',
              value: nextAudio?.info.title || 'No audio',
              inline: false,
            },
          )
          .setImage(nextAudio?.info.icon || null),
      ],
    });
  }

  @SlashCommand({ description: 'Enables loop' })
  async repeat(interaction: CommandInteraction) {
    await interaction.deferReply();

    this.player.isRepeat = !this.player.isRepeat;

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle(
          this.player.isRepeat ? 'Repeat enabled' : 'Repeat disabled',
        ),
      ],
    });
  }

  @SlashCommand({
    description: 'Stops audio player and clears the guild queue',
  })
  async stop(interaction: CommandInteraction) {
    await interaction.deferReply();

    if (!this.player.isPlaying) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle('No audio to skip'),
        ],
      });

      return;
    }

    this.player.stop();

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle('Audio stopped'),
      ],
    });
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async pause(interaction: CommandInteraction) {
    await interaction.deferReply();

    this.player.pause();

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Paused')],
    });
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async unpause(interaction: CommandInteraction) {
    await interaction.deferReply();

    this.player.unpause();

    await interaction.editReply({
      embeds: [buildGeneralResponse(new EmbedBuilder()).setTitle('Unpaused')],
    });
  }

  @SlashCommand({
    description: 'Clears audio queue',
  })
  async clear(interaction: CommandInteraction) {
    await interaction.reply('Not yet implemented');
  }
}
