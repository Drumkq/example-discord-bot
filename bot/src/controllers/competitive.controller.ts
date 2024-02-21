import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { BackendService } from '../services/backend/backend.service';
import { buildGeneralResponse } from '../utils/interaction.responses';

@Controller
export class ConnectionController {
  constructor(private readonly backend: BackendService) {}

  @SlashCommand({ description: 'Good luck with your dick', cooldown: 10000 })
  public async dick(interaction: CommandInteraction) {
    const randomNumber = Math.floor(Math.random() * (15 - -15) + -15);
    const updatedProfile = await this.backend.profileManager.changeProfileInfo(
      interaction.user.id,
      {
        dickSize: randomNumber,
      },
    );

    await interaction.editReply({
      embeds: [
        buildGeneralResponse(new EmbedBuilder()).setTitle(
          `Your dick size ${updatedProfile.dickSize}cm`,
        ),
      ],
    });
  }
}
