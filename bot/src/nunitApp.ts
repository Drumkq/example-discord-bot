import { Container } from 'inversify';
import { ControllersBuilder } from './utils/controllers.builder';
import { ServicesBuilder } from './utils/services.builder';
import { DiscordService } from './services/discord/discord.service';
import { SlashCommandService } from './services/discord/slashCommand.service';

export const container: Container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export class NunitApp {
  private controllersBuilder!: ControllersBuilder;
  private servicesBuilder!: ServicesBuilder;

  public async bootstrap() {
    this.servicesBuilder = new ServicesBuilder(container);
    this.servicesBuilder.build();

    const client = container.get(DiscordService);
    const slashCommand = container.get(SlashCommandService);
    this.controllersBuilder = new ControllersBuilder(
      client,
      slashCommand,
      container,
    );
    this.controllersBuilder.build();

    client.initialize();
    slashCommand.initialize();
  }
}
