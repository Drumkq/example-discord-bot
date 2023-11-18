import { Container } from 'inversify';
import { DiscordService } from '../services/discord/discord.service';
import { getClassMetadata, getMethodMetadata } from './reflect';
import { METADATA_KEYS } from '../decorators/keys.metadata';
import { ControllerSymbol } from '../controllers';
import { ClassMetadata } from '../decorators/class.metadata.interface';
import { EventMetadata } from '../decorators/events/event.metadata.interface';
import { SlashCommandMetadata } from '../decorators/slashCommands/slashCommand.metadata.interface';
import { SlashCommandService } from '../services/discord/slashCommand.service';

export class ControllersBuilder {
  constructor(
    private readonly discord: DiscordService,
    private readonly slashCommands: SlashCommandService,
    private readonly container: Container,
  ) {}

  public build() {
    getClassMetadata<ClassMetadata>(METADATA_KEYS.CONTROLLER, Reflect).forEach(
      (controller) => {
        this.container
          .bind(ControllerSymbol)
          .to(controller.target as new (...args: Array<never>) => unknown)
          .whenTargetNamed(controller.target.name);
      },
    );

    const controllers = this.container.getAll<any>(ControllerSymbol);
    this.registerEvents(controllers);
    const commands = this.registerSlashCommands(controllers);
    this.buildSlashCommands(commands);
  }

  private registerEvents(controllers: Array<any>) {
    controllers.forEach((controller) => {
      // Register 'once' methods
      getMethodMetadata<EventMetadata>(
        METADATA_KEYS.ONCE_EVENT,
        controller,
      ).forEach((onceEvent) => {
        this.discord.client.once(
          onceEvent.eventName,
          controller[onceEvent.key].bind(controller),
        );
      });

      // Register 'on' methods
      getMethodMetadata<EventMetadata>(
        METADATA_KEYS.ON_EVENT,
        controller,
      ).forEach((onEvent) => {
        this.discord.client.on(
          onEvent.eventName,
          controller[onEvent.key].bind(controller),
        );
      });
    });
  }

  private registerSlashCommands(
    controllers: Array<any>,
  ): SlashCommandMetadata[] {
    const commands = Array<SlashCommandMetadata>();

    controllers.forEach((controller) => {
      getMethodMetadata<SlashCommandMetadata>(
        METADATA_KEYS.SLASH_COMMAND,
        controller,
      ).forEach((slashCommand) => {
        /*
          The Target of the command
          is set to `null` because the decorator
          does not have access to an instance of the class
        */
        slashCommand.target = controller;
        this.slashCommands.addCommand(slashCommand);
        commands.push(slashCommand);
      });
    });

    return commands;
  }

  private buildSlashCommands(slashCommands: SlashCommandMetadata[]) {
    slashCommands.forEach((cmd) => {
      // Setup command information
      cmd.builder.setName(cmd.name || cmd.key).setDescription(cmd.description);

      // Setup command's options
      cmd.options?.forEach((option) => {
        option.build(cmd.builder);
      });
    });
  }
}
