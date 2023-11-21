import { createAudioResource } from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { AudioInfo, AudioUrlInfo } from '../../utils/audio';
import * as dl from 'play-dl';

@Service
export class AudioService {
  public async createAudio(url: AudioUrlInfo): Promise<AudioInfo | undefined> {
    // Only for youtube
    if (url.type !== 'youtube') {
      return undefined;
    }

    const [info, stream] = await Promise.all([
      dl.video_basic_info(url.url),
      dl.stream(url.url, { discordPlayerCompatibility: true }),
    ]);

    const audioData = info.video_details;
    const channel = audioData.channel;

    const authorName = channel?.name;
    const urlToAuthor = channel?.url;
    const authorIcon = channel?.icons?.at(0)?.url;

    return {
      resource: createAudioResource(stream.stream, { inputType: stream.type }),
      info: {
        duration: info.video_details.durationRaw,
        title: info.video_details.title || '',
        icon: info.video_details.thumbnails[0].url,
        urlToAudio: { type: 'youtube', url: info.video_details.url },
        authorName,
        urlToAuthor,
        authorIcon,
        views: info.video_details.views,
        likes: info.video_details.likes,
      },
    };
  }
}
