require('dotenv').config();
const pgp = require('pg-promise')();
const cx = process.env.DATABASE;

const DB_KEY = Symbol.for('corona.db');
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
if (!hasDb && cx) {
  global[DB_KEY] = pgp(cx);
}

const singleton = {};
Object.defineProperty(singleton, 'instance', {
  get: function() {
    return global[DB_KEY];
  },
});
Object.freeze(singleton);

module.exports = singleton.instance;
