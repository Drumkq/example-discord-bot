export function registerMethod(target: any, metadata: any, key: symbol) {
  let metadataList: Array<any> = [];
  if (!Reflect.hasOwnMetadata(key, target)) {
    Reflect.defineMetadata(key, metadataList, target);
  } else {
    metadataList = Reflect.getOwnMetadata(key, target) || [];
  }

  metadataList.push(metadata);
}
