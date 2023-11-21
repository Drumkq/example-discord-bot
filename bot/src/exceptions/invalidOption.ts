import { AppException } from './appException';

export class InvalidOption extends AppException {
  constructor(optionName: string) {
    super(`Invalid ${optionName}`);
  }
}
