// import { createCanvas, loadImage } from '@napi-rs/canvas';
import sharp from 'sharp';
import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash';

class Cache<T> {
  private cache: Map<string, T> = new Map();

  constructor(private loader: (key: string) => Promise<T>) {}

  async get(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    } else {
      const value = await this.loader(key);
      this.cache.set(key, value);
      return value;
    }
  }
}

// 使用内存缓存和持久化缓存结合的策略
const memoryHashCache = new Map<string, Uint8Array>();
const hashCache = new Cache(hashLoader);

async function hashLoader(imagePath: string) {
  // 检查内存缓存
  if (memoryHashCache.has(imagePath)) {
    return memoryHashCache.get(imagePath)!;
  }
    
  const maxSize = 100; // 使用较小的尺寸以加快处理速度
  const image = await sharp(imagePath);
  const {
    data: resizedImageData, 
    info: resizedInfo
  } = await image
    .resize(maxSize, maxSize, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const {width: resizedWidth, height: resizedHeight} = resizedInfo;
  const hash = rgbaToThumbHash(resizedWidth, resizedHeight, resizedImageData);
  
  // 存入内存缓存
  memoryHashCache.set(imagePath, hash);
  
  return hash;
}

// todo: performance optimization
export async function imageToHashBase64(imagePath: string) {
  const hash = await hashCache.get(imagePath);
  return Buffer.from(hash).toString('base64');
}

export async function imageToHashDataURL(imagePath: string) {
  const hash = await hashCache.get(imagePath);
  return thumbHashToDataURL(hash);
}