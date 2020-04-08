import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import fetch from 'node-fetch';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const R = require('ramda');

export default async (req, res) => {
  try {
    const { password, chunkSize } = req.body;
    const chunkEndpoint =
      (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') +
      req.headers.host +
      '/api/post/jobs/announcement/chunk';
    if (password === adminPassword) {
      await db.task(async t => {
        const results = await t.any(
          `SELECT
              p.id,
              p.last_reminded::date,
              PGP_SYM_DECRYPT((p.phone)::bytea, $/secret/) AS phone
          FROM person p
          WHERE
            verified
            and phoneHash = ENCODE(ENCRYPT('+4560550709', $/secret/, 'bf'), 'base64') -- DELETE THIS
            and NOT EXISTS (
              select l.id from "message_log" l
                where l.person = p.id
                and l.type = 'announcement'
      )`,
          { secret }
        );

        const chunkResults = await Promise.all(
          R.splitEvery(chunkSize || 100, results).map(chunk => {
            return fetch(chunkEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ password, chunk }),
            });
          })
        );
      });
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};

//function to split into chunks; used a for loop to do this, so put it in seperate function, to keep functional paradigm
function splitIntoChunks(persons, chunkSize) {
  let chunks = [];

  for (let i = 0; i < array.length / chunkSize; i++) {
    chunks.push(persons.slice(i * chunkSize, i * chunkSize + chunkSize));
  }
}
