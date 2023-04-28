"use strict";

// Tests for Korg87

import {Korg87} from "../korg87/index.mjs";

let isSame = function (a, b) {
	if (a.length != b.length) {
		return false;
	};
	let same = true;
	a.forEach((e, i) => {
		if (same && e != b[i]) {
			same = false;
		};
	});
	return same;
};

// Blob encoding test
let testData = [];
for (let count = 0; count < 16; count ++) {
	let buffer = new Uint8Array(Math.floor(Math.random() * 106) + 7);
	crypto.getRandomValues(buffer);
	testData.push(buffer);
};
testData.forEach(async (e, i) => {
	let encoded = new Uint8Array(Korg87.encodeLength(e.length));
	await Korg87.encode(e, encoded);
	let decoded = new Uint8Array(Korg87.decodeLength(encoded.length));
	await Korg87.decode(encoded, decoded);
	let passed = isSame(e, decoded);
	console.info(`Test #2 #${i + 1} ${["fail", "pass"][+passed]}ed.`);
	if (!passed) {
		console.info(`Truth: ${e.join(", ")}`);
		console.info(`Proxy: ${encoded.join(", ")}`);
		console.info(`Proof: ${decoded.join(", ")}`);
	};
});

// Block encoding test
testData = [
	new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
	new Uint8Array([121, 122, 123, 124, 125, 126, 127]),
	new Uint8Array([128, 129, 130, 131, 132, 133, 134]),
	new Uint8Array([249, 250, 251, 252, 253, 254, 255])
];
for (let count = 0; count < 12; count ++) {
	let buffer = new Uint8Array(Math.floor(Math.random() * 7) + 1);
	crypto.getRandomValues(buffer);
	testData.push(buffer);
};
testData.forEach((e, i) => {
	let encoded = new Uint8Array(Korg87.encodeLength(e.length));
	let decoded = new Uint8Array(Korg87.decodeLength(encoded.length));
	Korg87.encodeBlock(e, encoded);
	Korg87.decodeBlock(encoded, decoded);
	let passed = isSame(e, decoded);
	console.info(`Test #1 #${i + 1} ${["fail", "pass"][+passed]}ed.`);
	if (!passed) {
		console.info(`Truth: ${e.join(", ")}`);
		console.info(`Proxy: ${encoded.join(", ")}`);
		console.info(`Proof: ${decoded.join(", ")}`);
	};
});
