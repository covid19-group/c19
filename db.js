require('dotenv').config();
const pgp = require('pg-promise')();

const DB_KEY = Symbol.for('corona.db');
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
if (!hasDb) {
  global[DB_KEY] = pgp(process.env.DATABASE);
}

const singleton = {};
Object.defineProperty(singleton, 'instance', {
  get: function() {
    return global[DB_KEY];
  },
});
Object.freeze(singleton);

module.exports = singleton.instance;
