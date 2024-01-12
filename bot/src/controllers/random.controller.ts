import axios from 'axios';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { ConfigService } from '../services/config.service';
import { CommandInteraction } from 'discord.js';
import { random } from 'lodash';

@Controller
export class RandomController {
  constructor(private readonly config: ConfigService) {}

  @SlashCommand({ description: 'Print random cat gif' })
  public async catpick(interaction: CommandInteraction) {
    const data = (
      await axios.get('https://api.giphy.com/v1/gifs/search', {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params: {
          api_key: this.config.get<string>('GIPHY_API_KEY'),
          q: 'kitty meme',
          limit: 1,
          offset: random(0, 4999),
        },
      })
    ).data;

    await interaction.editReply(data.data[0].url);
  }
}
