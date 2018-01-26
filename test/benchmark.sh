#!/bin/bash

function exec_time() {
	start=$(date +%s.%N)
	eval $1
	stop=$(date +%s.%N)

	echo $(echo "$stop - $start"|bc)
}

N_TEST=25

function performance_compress() {
	echo "RUN COMPRESSION PERFORMANCE TEST $N_TEST ITERATION"
	cpp_time=$(exec_time "for i in {1..$N_TEST}; do src/woff2/out/woff2_compress test/temporary/fontelico.ttf &> /dev/null; done")
	echo "C++ TIME: $cpp_time sec"
	js_time=$(exec_time "for i in {1..$N_TEST}; do node bin/woff2_compress.js test/temporary/fontelico.ttf test/temporary/fontelico_js.woff2 &> /dev/null; done")
	echo "JS TIME: $js_time sec"
}

function performance_decompress() {
	echo "RUN DECOMPRESSION PERFORMANCE TEST $N_TEST ITERATION"
	cpp_time=$(exec_time "for i in {1..$N_TEST}; do src/woff2/out/woff2_decompress test/temporary/fontelico.woff2 &> /dev/null; done")
	echo "C++ TIME: $cpp_time sec"
	js_time=$(exec_time "for i in {1..$N_TEST}; do node bin/woff2_decompress.js test/temporary/fontelico.woff2 test/temporary/fontelico_js.ttf &> /dev/null; done")
	echo "JS TIME: $js_time sec"
}

mkdir -p test/temporary
cp test/fixtures/fontelico.ttf test/temporary
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:src/brotli/out/installed/lib

performance_compress
performance_decompress

rm test/temporary/*