all: woff2 woff2_c

brotli:
	make -C src/brotli/ -f ../Makefile.brotli

woff2: brotli
	make -C src/woff2/ -f ../Makefile.woff2
	npm install

woff2_c: brotli_c
	mkdir -p src/woff2/woff2_compress
	cd src/woff2/woff2_compress; cmake -DBROTLIDEC_INCLUDE_DIRS=../../brotli/buildfiles/installed/include \
	  -DBROTLIDEC_LIBRARIES=../../brotli/buildfiles/installed/lib/libbrotlidec.so \
	  -DBROTLIENC_INCLUDE_DIRS=../../brotli/buildfiles/installed/include \
	  -DBROTLIENC_LIBRARIES=../../brotli/buildfiles/installed/lib/libbrotlienc.so ..
	make -C src/woff2/woff2_compress
	make fixtures

brotli_c:
	mkdir -p src/brotli/buildfiles
	cd src/brotli/buildfiles; cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=./installed ..
	cd src/brotli/buildfiles; cmake --build . --config Release --target install

fixtures:
	export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:src/brotli/buildfiles/installed/lib; src/woff2/woff2_compress/woff2_compress test/fixtures/sample.ttf

lint:
	./node_modules/.bin/eslint .

test: lint
	node_modules/.bin/mocha

benchmark: files_exist
	test/benchmark.sh

files_exist:
	[ -e src/woff2/woff2_compress/woff2_compress ]
	[ -e src/woff2/woff2_compress/woff2_decompress ]
	[ -e build/woff2/compress_binding.js ]
	[ -e build/woff2/compress_binding.wasm ]
	[ -e build/woff2/decompress_binding.js ]
	[ -e build/woff2/decompress_binding.wasm ]

clean:
	make -C src/brotli/ -f ../Makefile.brotli clean
	make -C src/woff2/ -f ../Makefile.woff2 clean
	rm -rf src/brotli/buildfiles
	rm -rf src/woff2/woff2_compress

.PHONY: test
