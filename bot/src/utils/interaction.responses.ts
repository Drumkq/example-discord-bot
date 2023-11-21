import { EmbedBuilder } from 'discord.js';

export function buildGeneralResponse(embed: EmbedBuilder): EmbedBuilder {
  return embed
    .setFooter({ text: 'Thanks for using Nunit Beta' })
    .setColor('Blue');
}
