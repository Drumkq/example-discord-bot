import { CommandInteraction, GuildMember } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { StringOption } from '../decorators/slashCommands/options/stringOption';
import { AudioService } from '../services/music/audio.service';
import { ConnectionService } from '../services/music/connection.service';

@Controller
export class MusicController {
  constructor(
    private readonly audio: AudioService,
    private readonly connection: ConnectionService,
  ) {}

  @SlashCommand({
    description: 'Adds a new song to the guild queue',
    options: [new StringOption('url', 'Url to the YouTube video', true)],
  })
  async play(interaction: CommandInteraction) {
    const url = interaction.options.get('url')?.value as string;
    if (!url) {
      await interaction.reply('Failed to get url');
      return;
    }

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

    this.connection.join({
      adapterCreator: guildMember.guild.voiceAdapterCreator,
      guildId: guildMember.guild.id,
      channelId: guildMember.voice.channelId,
    });

    await this.audio.addSong(url);
    const song = await this.audio.getCurrentSong();
    if (song) {
      try {
        this.audio.player.play(song);
      } catch (e) {
        console.error(e);
      }
    }
    await interaction.reply('Playing the song');
  }

  @SlashCommand({ description: 'Skips playing track in the guild queue' })
  async skip(interaction: CommandInteraction) {
    const song = await this.audio.getCurrentSong();
    if (song) {
      this.audio.player.play(song);
      await interaction.reply('Track skipped');
      return;
    }

    await interaction.reply('Nothing to skip');
  }

  @SlashCommand({ description: 'Enables loop' })
  async repeat(interaction: CommandInteraction) {
    this.audio.repeat = !this.audio.repeat;
    await interaction.reply('Repeat toggled');
  }

  @SlashCommand({
    description: 'Stops audio player and clears the guild queue',
  })
  async stop(interaction: CommandInteraction) {
    this.audio.player.stop();

    await interaction.reply('Stopped');
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async pause(interaction: CommandInteraction) {
    this.audio.player.pause(true);

    await interaction.reply('Paused');
  }

  @SlashCommand({
    description: 'Pauses audio player',
  })
  async unpause(interaction: CommandInteraction) {
    this.audio.player.unpause();

    await interaction.reply('Unpaused');
  }

  @SlashCommand({
    description: 'Clears audio queue',
  })
  async clear(interaction: CommandInteraction) {
    this.audio.clearQueue();

    await interaction.reply('Cleared!');
  }
}
