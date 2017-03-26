import crypto from 'crypto';

export function getTimestamp() {
  return parseInt(Date.now() / 1000, 10);
}

export function getHash(ts, privKey, pubKey) {
  const hashValue = ts + privKey + pubKey;
  return crypto.createHash('md5').update(hashValue).digest('hex');
}

export function formatResponse(response) {
  return { ...response.data.data };
}
