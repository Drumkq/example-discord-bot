import { AudioResource } from '@discordjs/voice';
import * as dl from 'play-dl';

export type AudioUrlInfo = {
  readonly type: 'youtube';
  readonly url: string;
};

export type AudioInfo = {
  readonly resource: AudioResource;
  readonly info: dl.InfoData;
};
