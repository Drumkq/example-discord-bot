import { SlashCommandBuilder } from 'discord.js';
import { Option } from './option';

export class BooleanOption extends Option {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly required: boolean,
  ) {
    super(name, description, required);
  }

  build(builder: SlashCommandBuilder) {
    return builder.addBooleanOption((opt) => this.setupGeneralInformation(opt));
  }
}
