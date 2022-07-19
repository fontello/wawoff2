import init from './build/decompress_binding.mjs';

const _modulePromise = init();

function _decompress(module, buffer) {
    const result = module.decompress(buffer);
    if (result === false) throw new Error('ConvertWOFF2ToTTF failed');
    return result;
}

export default async function decompress (buffer) {
  const module =  await _modulePromise;
  return _decompress(module, buffer);
}

export async function getDecompressSync() {
    const module = await _modulePromise;
    function decompressSync(buffer) {
        return _decompress(module, buffer);
    }
    return decompressSync;
}
