import { Service } from '../decorators/service.decorator';

import dotenv from 'dotenv';
dotenv.config();

@Service
export class ConfigService {
  get<T>(path: string) {
    return process.env[path] as T;
  }
}
