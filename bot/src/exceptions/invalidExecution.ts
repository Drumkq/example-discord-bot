import { AppException } from './appException';

export class InvalidGuildExecution extends AppException {
  constructor() {
    super('Action performed outside the guild');
  }
}

export class InvalidPmExecution extends AppException {
  constructor() {
    super('Action performed not in the personal messages');
  }
}
