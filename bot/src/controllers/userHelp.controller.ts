import { Controller } from '../decorators/controller.decorator';
import { SlashCommandService } from '../services/discord/slashCommand.service';

@Controller
export class UserHelpController {
  constructor(private readonly slashCommand: SlashCommandService) {}
}
