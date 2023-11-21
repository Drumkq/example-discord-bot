import { AudioResource } from '@discordjs/voice';

export type AudioUrlInfo = {
  type: 'youtube';
  url: string;
};

export type AudioInfo = {
  readonly resource: AudioResource;
  readonly info: {
    readonly duration: string;
    readonly views: number;
    readonly likes: number;

    readonly title: string;
    readonly icon: string;
    readonly urlToAudio: AudioUrlInfo;

    readonly authorName?: string;
    readonly authorIcon?: string;
    readonly urlToAuthor?: string;
  };
};
