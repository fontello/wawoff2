CARGS=-std=gnu++11 --bind -s ALLOW_MEMORY_GROWTH=1 -O3
FIXTURES=/src/wawoff2/test/fixtures

all:
	mkdir -p /src/wawoff2/build

	emcc -o /src/wawoff2/build/compress_binding.js /src/wawoff2/src/compress_binding.cc \
		-I/src/woff2/include/ $(CARGS) \
		/src/build/woff2-wasm/libwoff2enc.a /src/build/woff2-wasm/libwoff2common.a \
		/src/build/brotli-wasm/libbrotlienc.a /src/build/brotli-wasm/libbrotlicommon.a

	emcc -o /src/wawoff2/build/decompress_binding.js /src/wawoff2/src/decompress_binding.cc \
		-I/src/woff2/include/ $(CARGS) \
		/src/build/woff2-wasm/libwoff2dec.a /src/build/woff2-wasm/libwoff2common.a \
		/src/build/brotli-wasm/libbrotlidec.a /src/build/brotli-wasm/libbrotlicommon.a

	/src/build/woff2-native/woff2_compress $(FIXTURES)/sample.ttf
	mv $(FIXTURES)/sample.woff2 $(FIXTURES)/sample_compressed.woff2

	/src/build/woff2-native/woff2_decompress $(FIXTURES)/sample_compressed.woff2
	mv $(FIXTURES)/sample_compressed.ttf $(FIXTURES)/sample_decompressed.ttf
