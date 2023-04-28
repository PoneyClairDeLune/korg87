# korg87
🧐 Encode binary data with KORG 8 on 7 encoding.

## API
### `Korg87`
#### `.encodeBlock(inputSlice, outputSlice)`
Encode a 7-byte (or less) block.

#### `.decodeBlock(inputSlice, outputSlice)`
Decode a 8-byte (or less) block.

#### `.encodeBytes(inputBuffer, outputBuffer)`
Encode `Uint8Array`.

#### `.decodeBytes(inputBuffer, outputBuffer)`
Decode `Uint8Array`.

#### `.encodeSync(inputBuffer, outputBuffer)`
Encode any of `ArrayBuffer` or `TypedArray`.

#### `.decodeSync(inputBuffer, outputBuffer)`
Encode any of `ArrayBuffer` or `TypedArray`.

#### `.encode(inputBuffer, outputBuffer)`
Async version of `.encodeSync`.

#### `.decode(inputBuffer, outputBuffer)`
Async version of `.decodeSync`.
