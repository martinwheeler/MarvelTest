import crypto from 'crypto';

export function getTimestamp() {
  return parseInt(Date.now() / 1000, 10)
}

export function getHash(ts, privKey, pubKey) {
  let beforeHash = ts + privKey + pubKey,
  hash = crypto.createHash('md5').update(beforeHash).digest("hex");

  return hash;
}

export function formatResponse(response) {
  let newResponse = {
    ...response.data
  };

  return newResponse;
}
