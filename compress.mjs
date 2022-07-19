import init from './build/compress_binding.mjs';

const _modulePromise = init();

function _compress(module, buffer) {
    const result = module.compress(buffer);
    if (result === false) throw new Error('ConvertTTFToWOFF2 failed');
    return result;
}

export default async function compress (buffer) {
  const module =  await _modulePromise;
  return _compress(module, buffer);
}

export async function getCompressSync() {
    const module = await _modulePromise;
    function compressSync(buffer) {
        return _compress(module, buffer);
    }
    return compressSync;
}
