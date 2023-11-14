import { Container } from 'inversify';
import { DiscordService } from '../services/discord.service';
import { getClassMetadata, getMethodMetadata } from './reflect';
import { METADATA_KEYS } from '../decorators/keys.metadata';
import { ControllerSymbol } from '../controllers';
import { ClassMetadata } from '../decorators/class.metadata.interface';
import { EventMetadata } from '../decorators/events/event.metadata.interface';
import { SlashCommandMetadata } from '../decorators/slashCommands/slashCommand.metadata.interface';
import { SlashCommandService } from '../services/slashCommand.service';

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
    this.registerSlashCommands(controllers);
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

  private registerSlashCommands(controllers: Array<any>) {
    controllers.forEach((controller) => {
      getMethodMetadata<SlashCommandMetadata>(
        METADATA_KEYS.SLASH_COMMAND,
        controller,
      ).forEach((slashCommand) => {
        this.slashCommands.addCommand(slashCommand, controller);
      });
    });
  }
}