export enum Features {
  None = 0,
  Moderation = 1 << 1,
  Welcome = 1 << 2,
  All = None | Moderation | Welcome,
}
