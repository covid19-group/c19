import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import { sendSMS } from '../../../../../twilio';
import smsContent from '../../../../../content/sms';
import fetch from 'node-fetch';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const R = require('ramda');

export default async (req, res) => {
  try {
    const { password, chunkSize } = req.body;
    const chunkEndpoint = 'https://' + req.headers.host + '/api/post/jobs/copy-to-data-warehouse/chunk';

    if (password === adminPassword) {
      const last_batch_job = (await db.one(`select * from "_db" where entity = 'copy-to-data-warehouse'`)).modifiedon;

      const results = await db.any(
        `select * from "survey" where modified_on > $/last_batch_job/::timestamp with time zone`,
        { last_batch_job }
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
      await db.one(`UPDATE "_db" SET modifiedon = now() WHERE entity = 'copy-to-data-warehouse' returning *`);
    }
    res.status(200).end();
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
