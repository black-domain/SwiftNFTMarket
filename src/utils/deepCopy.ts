/** @format */

export function deepCopy<T>(obj: T): T {
  let copy: any;

  // 检查是否为简单类型数据
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 如果是数组，则递归遍历并复制
  if (Array.isArray(obj)) {
    copy = [];

    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }

    return copy as T;
  }

  // 如果是对象，则递归遍历并复制
  const keys = Object.keys(obj);

  copy = {};

  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    //@ts-ignore
    copy[key] = deepCopy(obj[key]);
  }

  return copy as T;
}
