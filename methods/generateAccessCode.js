require('dotenv').config();
const crypto = require('crypto');

function accessCode(value) {
  return crypto
    .createHash('sha256')
    .update(process.env.SECRET + '-' + value, 'utf-8')
    .digest('hex');
}
