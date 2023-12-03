export function registerClass(
  target: NewableFunction,
  metadata: any,
  key: symbol,
) {
  Reflect.defineMetadata(key, metadata, target);

  const oldClasses = (Reflect.getMetadata(key, Reflect) as Array<any>) || [];
  Reflect.defineMetadata(key, [metadata, ...oldClasses], Reflect);
}
