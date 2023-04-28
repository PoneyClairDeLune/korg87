# korg87
🧐 Encode binary data with KORG 8 on 7 encoding.

This project is a response to [How the Great Firewall of China Detects and Blocks Fully Encrypted Traffic](https://gfw.report/publications/usenixsecurity23/en/), as the encoding scheme used in the project...

* Cannot have randomness exceed 87.5%.
* Around 75% of the bytes are printable.

## API
### `Korg87`
#### `.encodeLength(length)`
Estimate encode length.

#### `.decodeLength(length)`
Estimate decode length.

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
