/* 
   Distributed under MIT license.
   See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
*/

#include <woff2/encode.h>
#include <emscripten/bind.h>


emscripten::val compress(std::string input) {
  const uint8_t* input_data = reinterpret_cast<const uint8_t*>(input.data());
  size_t output_size = woff2::MaxWOFF2CompressedSize(input_data, input.size());
  std::string output(output_size, 0);
  uint8_t* output_data = reinterpret_cast<uint8_t*>(&output[0]);

  woff2::WOFF2Params params;
  if (!woff2::ConvertTTFToWOFF2(input_data, input.size(),
                                output_data, &output_size, params)) {
    return emscripten::val(false);
  }
  output.resize(output_size);

  return emscripten::val(
    emscripten::typed_memory_view(output.size(), reinterpret_cast<unsigned const char*>(output.data()))
  );
}


EMSCRIPTEN_BINDINGS(wawoff2) {
  emscripten::function("compress", &compress);
}
