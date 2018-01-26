all: woff2 woff2_c

brotli:
	make -C src/brotli/ -f ../Makefile.brotli

woff2: brotli
	make -C src/woff2/ -f ../Makefile.woff2
	npm install

woff2_c: brotli_c
	mkdir -p src/woff2/out
	cd src/woff2/out; cmake -DBROTLIDEC_INCLUDE_DIRS=../../brotli/out/installed/include \
	  -DBROTLIDEC_LIBRARIES=../../brotli/out/installed/lib/libbrotlidec.so \
	  -DBROTLIENC_INCLUDE_DIRS=../../brotli/out/installed/include \
	  -DBROTLIENC_LIBRARIES=../../brotli/out/installed/lib/libbrotlienc.so ..
	make -C src/woff2/out

brotli_c:
	mkdir -p src/brotli/out
	cd src/brotli; cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=./out/installed .
	cd src/brotli; cmake --build . --config Release --target install

test: files_exist
	mkdir -p test/temporary
	cp test/fixtures/fontelico.ttf test/temporary
	
	export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:src/brotli/out/installed/lib; src/woff2/out/woff2_compress test/temporary/fontelico.ttf
	node bin/woff2_compress.js test/temporary/fontelico.ttf test/temporary/fontelico_js.woff2
	cmp test/temporary/fontelico.woff2 test/temporary/fontelico_js.woff2
	
	rm test/temporary/fontelico.ttf
	export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:src/brotli/out/installed/lib; src/woff2/out/woff2_decompress test/temporary/fontelico.woff2
	node bin/woff2_decompress.js test/temporary/fontelico.woff2 test/temporary/fontelico_js.ttf
	cmp test/temporary/fontelico.ttf test/temporary/fontelico_js.ttf

	rm test/temporary/*

benchmark: files_exist
	test/benchmark.sh

files_exist:
	[ -e src/woff2/out/woff2_compress ]
	[ -e src/woff2/out/woff2_decompress ]
	[ -e build/woff2/compress_binding.js ]
	[ -e build/woff2/compress_binding.wasm ]
	[ -e build/woff2/decompress_binding.js ]
	[ -e build/woff2/decompress_binding.wasm ]

clean:
	make -C src/brotli/ -f ../Makefile.brotli clean	
	make -C src/woff2/ -f ../Makefile.woff2 clean
	rm -rf src/brotli/out
	rm -rf src/woff2/out
