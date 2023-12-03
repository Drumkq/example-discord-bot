import { AudioUrlInfo } from './audio';

export class UrlQueue {
  private readonly urlQueue = new Array<AudioUrlInfo>();

  public addUrl(url: AudioUrlInfo) {
    this.urlQueue.push(url);

    return this.urlQueue;
  }

  public clear() {
    this.urlQueue.length = 0;
  }

  public getUrl(erase: boolean) {
    if (erase) {
      return this.urlQueue.shift();
    }

    return this.urlQueue[0];
  }
}
