import { IUser } from 'src/models/user/user.interface';

export type Track = {
  readonly type: 'YouTube' | 'Soundcloud';
  readonly url: string;
  readonly title: string;
  readonly author: string;
  readonly urlToAuthor: string;
  readonly whoRequested: IUser;
};
