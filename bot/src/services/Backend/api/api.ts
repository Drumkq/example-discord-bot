import { RequestMethods } from './request-methods';
import { ConfigService } from '../../config.service';
import axios from 'axios';

export abstract class Api {
  protected constructor(protected readonly config: ConfigService) {
    this.endpoint = config.get<string>('API_ENDPOINT');
    this.token = config.get<string>('CLIENT_SECRET');
  }

  private endpoint: string;
  private token: string;

  public async makeRequest<T>(
    path: string,
    method: RequestMethods,
    data?: unknown,
  ) {
    return (
      await axios.request<T>({
        url: `${this.endpoint}/${path}`,
        method: method,
        data: data,
        headers: { 'X-API-KEY': this.token },
      })
    ).data;
  }
}
