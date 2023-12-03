import { MethodMetadata } from '../common/methodMetadata';
import { SlashCommandContext } from './SlashCommand.context';

export type SlashCommandMetadata = MethodMetadata & SlashCommandContext;
