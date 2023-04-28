"use strict";

// KORG 8 on 7 codec

let typeCheck = function (variable, type, nullable = false) {
	if (!type && !nullable) {
		throw(new TypeError(`Type is not defined`));
	};
	if (variable?.constructor) {
		if (variable.constructor != type) {
			throw(new TypeError(`Value is not type ${type.name}`));
		};
	} else {
		if (!nullable) {
			throw(new TypeError(`Value is not nullable`));
		};
	};
};

let windowMove = function (inBuf, inBufWin, outBuf, outBufWin) {
	typeCheck(inBuf, Uint8Array);
	typeCheck(outBuf, Uint8Array);
	typeCheck(inBufWin, Number);
	typeCheck(outBufWin, Number);
};

let Korg87 = class {
	static chunkSizeEnc = 7;
	static chunkSizeDec = 8;
	static encodeLength(length) {
		typeCheck(length, Number);
		return Math.ceil(length * this.chunkSizeDec / this.chunkSizeEnc);
	};
	static decodeLength(length) {
		typeCheck(length, Number);
		return Math.floor(length * this.chunkSizeEnc / this.chunkSizeDec);
	};
	static encodeBlock(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (source.length > this.chunkSizeEnc) {
			throw(new Error(`Source is greater than ${this.chunkSizeEnc} bytes`));
		};
		if (target.length < this.encodeLength(source.length)) {
			throw(new Error(`Target isn't sufficient for decoding`));
		};
		let overlayByte = 0;
		source.forEach((e, i) => {
			target[i + 1] = e & 127;
			overlayByte |= (e >> 7) << i;
		});
		target[0] = overlayByte;
	};
	static decodeBlock(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (source.length > this.chunkSizeDec) {
			throw(new Error(`Source is greater than ${this.chunkSizeEnc} bytes`));
		};
		if (target.length < this.decodeLength(source.length)) {
			throw(new Error(`Target isn't sufficient for decoding`));
		};
		let overlayByte = source[0];
		source.subarray(1).forEach((e, i) => {
			target[i] = e | (((overlayByte >> i) & 1) << 7);
		});
	};
};

export {
	Korg87
};
