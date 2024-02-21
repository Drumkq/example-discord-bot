import { Service } from '../decorators/service.decorator';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

@Service
export class ConfigService {
  get<T>(path: string) {
    return process.env[path] as T;
  }
}
