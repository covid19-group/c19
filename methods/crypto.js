require('dotenv').config();
const crypto = require('crypto');

export function encrypt({ phone, code }) {
  const key = crypto.createCipher('aes-128-cbc', process.env.SECRET);
  const string = key.update(phone + '-' + code, 'utf8', 'hex');
  return string + key.final('hex');
}

export function decrypt(cipher) {
  const key = crypto.createDecipher(cipher, process.env.SECRET);
  const string = key.update(cipher, 'hex', 'utf8');
  const decrypted = string + key.final('utf8');
  const [phone, code] = decrypted.split('-');
  return { phone, code };
}
