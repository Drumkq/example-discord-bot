export function getClassMetadata<T>(key: symbol, target: object): Array<T> {
  return Reflect.getMetadata(key, target) as Array<T> | [];
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getMethodMetadata<T>(key: symbol, klass: Function): Array<T> {
  const meta = Reflect.getOwnMetadata(key, klass.constructor) as Array<T>;
  if (!meta) {
    return [];
  }

  return meta;
}
