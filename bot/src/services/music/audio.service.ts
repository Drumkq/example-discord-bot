import { createAudioResource } from '@discordjs/voice';
import { Service } from '../../decorators/service.decorator';
import { AudioInfo } from '../../utils/audio';
import * as dl from 'play-dl';
import { TrackDto } from '../backend/state/tracks/track.dto';
import { TrackType } from '../backend/state/tracks/track-type.enum';

@Service
export class AudioService {
  public async info(track?: TrackDto): Promise<dl.InfoData | undefined> {
    if (track === undefined) {
      return undefined;
    }

    if (track.type !== TrackType.YOUTUBE) {
      return undefined;
    }

    return await dl.video_basic_info(track.url);
  }

  public async createAudio(url: TrackDto): Promise<AudioInfo | undefined> {
    // Only for Youtube
    if (url.type !== TrackType.YOUTUBE) {
      return undefined;
    }

    const [info, stream] = await Promise.all([
      dl.video_basic_info(url.url),
      dl.stream(url.url, { discordPlayerCompatibility: true }),
    ]);

    return {
      resource: createAudioResource(stream.stream, { inputType: stream.type }),
      info,
    };
  }
}
