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
	cpp_time=$(exec_time "for i in {1..$N_TEST}; do src/woff2/woff2_compress/woff2_compress test/temporary/sample.ttf &> /dev/null; done")
	echo "C++ TIME: $cpp_time sec"
	js_time=$(exec_time "for i in {1..$N_TEST}; do node bin/woff2_compress.js test/temporary/sample.ttf test/temporary/sample_js.woff2 &> /dev/null; done")
	echo "JS TIME: $js_time sec"
}

function performance_decompress() {
	echo "RUN DECOMPRESSION PERFORMANCE TEST $N_TEST ITERATION"
	cpp_time=$(exec_time "for i in {1..$N_TEST}; do src/woff2/woff2_compress/woff2_decompress test/temporary/sample.woff2 &> /dev/null; done")
	echo "C++ TIME: $cpp_time sec"
	js_time=$(exec_time "for i in {1..$N_TEST}; do node bin/woff2_decompress.js test/temporary/sample.woff2 test/temporary/sample_js.ttf &> /dev/null; done")
	echo "JS TIME: $js_time sec"
}

mkdir -p test/temporary
cp test/fixtures/sample.ttf test/temporary
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:src/woff2/brotli/buildfiles/installed/lib

performance_compress
performance_decompress

rm test/temporary/*