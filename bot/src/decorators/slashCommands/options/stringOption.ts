import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import { Option } from './option';

export class StringOption extends Option {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly required: boolean,
    public readonly minLength?: number,
    public readonly maxLength?: number,
  ) {
    super(name, description, required);
  }

  build(builder: SlashCommandBuilder) {
    return builder.addStringOption((opt) =>
      this.setupGeneralInformation<SlashCommandStringOption>(opt)
        .setMinLength(this.minLength || 0)
        .setMaxLength(this.maxLength || 6000),
    );
  }
}
