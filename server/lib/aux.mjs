import forge from 'node-forge';

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function randomIntInclusive(min, max) {
  return randomInt(min, max + 1);
}

export function randomBinaryBuffer() {
  const buff = Buffer.alloc(64);
  buff.writeUIntBE(Date.now(), 0, 6);

  for (let i = 6; i < 64; i++) {
    buff.writeUInt8(randomIntInclusive(0, 255), i);
  }
  return buff;
}

export function reinforcePassword(password, salt = randomBinaryBuffer()) {
  const md = forge.md.sha512.create();
  return [ Buffer.from(md.update(salt.toString('ascii')).update(password).digest().toHex(), 'hex'), salt ];
}

export function randomToken() {
  const buff = Buffer.alloc(64);
  buff.writeUIntBE(Date.now(), 0, 6);
  for (let i = 6; i < 64; i++) {
    buff.writeUInt8(randomIntInclusive(0, 255), i);
  }

  const md = forge.md.sha256.create();
  md.update(buff.toString('ascii'));
  return Buffer.from(md.digest().toHex(), 'hex');
}