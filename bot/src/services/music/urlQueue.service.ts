import { Service } from '../../decorators/service.decorator';
import { AudioUrlInfo } from '../../utils/audio';

@Service
export class UrlQueueService {
  private readonly urlQueue = new Map<string, Array<AudioUrlInfo>>();

  public addUrl(guildId: string, url: AudioUrlInfo) {
    let queue = this.urlQueue.get(guildId);
    if (queue === undefined) {
      queue = this.urlQueue
        .set(guildId, new Array<AudioUrlInfo>())
        .get(guildId);
      queue!.push(url);
    } else {
      queue.push(url);
    }

    return queue!;
  }

  public clear() {
    this.urlQueue.clear();
  }

  public getUrl(guildId: string, erase: boolean) {
    if (erase) {
      const queue = this.urlQueue.get(guildId);
      if (!queue) return undefined;

      return queue.shift();
    }

    const queue = this.urlQueue.get(guildId);
    if (!queue) return undefined;

    return queue[0];
  }
}
