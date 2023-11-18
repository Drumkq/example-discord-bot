export function getClassMetadata<T>(key: symbol, target: object): Array<T> {
  let meta = Reflect.getMetadata(key, target) as Array<T>;
  if (meta === undefined) {
    meta = [];
  }

  return meta;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getMethodMetadata<T>(key: symbol, klass: Function): Array<T> {
  let meta = Reflect.getOwnMetadata(key, klass.constructor) as Array<T>;
  if (meta === undefined) {
    meta = [];
  }

  return meta;
}
