import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { StringOption } from '../decorators/slashCommands/options/stringOption';
import { ConnectionService } from '../services/music/connection.service';
import { InteractionExtension } from '../utils/interaction.extension';
import { InvalidGuildExecution } from '../exceptions/invalidExecution';
import { buildGeneralResponse } from '../utils/interaction.responses';

@Controller
export class MusicController {
  constructor(private readonly connection: ConnectionService) {}

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

    player.urls.addUrl({ type: 'youtube', url: url });
    const audios = await player.play(false);
    if (audios === undefined) {
      interaction.editReply('No audio to play');
      return;
    }

    const { currentAudio, nextAudio } = audios;
    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder())
          .setTitle(currentAudio.info.title)
          .setURL(currentAudio.info.urlToAudio.url)
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

    const player = this.connection.players.get(interaction.guildId);
    if (!player) {
      return;
    }

    const audios = await player.play(true);
    if (!audios) {
      player.stop();

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
          .setURL(currentAudio.info.urlToAudio.url)
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
    const player = this.connection.players.get(
      InteractionExtension.getGuild(interaction).id,
    );
    if (!player) {
      return;
    }

    if (!player.isPlaying) {
      await interaction.editReply({
        embeds: [
          buildGeneralResponse(new EmbedBuilder()).setTitle('No audio to skip'),
        ],
      });

      return;
    }

    player.stop();

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

    player.urls.clear();

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle(
          'The queue has been cleared',
        ),
      ],
    });
  }
}
