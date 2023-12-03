import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Controller } from '../decorators/controller.decorator';
import { SlashCommand } from '../decorators/slashCommands/slashCommand.decorator';
import { BackendService } from '../services/Backend/backend.service';
import { buildGeneralResponse } from '../utils/interaction.responses';

@Controller
export class ConnectionController {
  constructor(private readonly backend: BackendService) {}

  @SlashCommand({ description: 'Good luck with your dick', cooldown: 10000 })
  public async dick(interaction: CommandInteraction) {
    const randomNumber = Math.floor(Math.random() * (15 - -15) + -15);
    const profile = await this.backend.getUserProfile(interaction.user.id);
    const updatedProfile = await this.backend.patchUserProfile(
      interaction.user.id,
      {
        dickSize: profile.dickSize + randomNumber,
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
