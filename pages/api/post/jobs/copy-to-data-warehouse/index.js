import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import { sendSMS } from '../../../../../twilio';
import smsContent from '../../../../../content/sms';
import fetch from 'node-fetch';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const survey_secret = process.env.SURVEY_SECRET;
const R = require('ramda');

export default async (req, res) => {
  try {
    const { password, chunkSize } = req.body;
    const chunkEndpoint = 'https://' + req.headers.host + '/api/post/jobs/copy-to-data-warehouse/chunk';

    if (password === adminPassword) {
      const { surveys, this_batch_job } = await db.task(async t => {
        const [this_batch_job, last_batch_job] = await t.batch([
          t.one(`select now()`),
          t.one(`select modifiedon from "_db" where entity = 'copy-to-data-warehouse'`),
        ]);

        const surveys = await db.any(
          `select
            id,
            person,
            date,
            pgp_sym_decrypt(value, $/survey_secret/)::jsonb as value
          from "survey"
          where modified_on > $/last_batch_job/::timestamp with time zone`,
          { last_batch_job, survey_secret }
        );
        return { surveys, this_batch_job };
      });

      const chunkSurveys = await Promise.all(
        R.splitEvery(chunkSize || 100, surveys).map(chunk => {
          return fetch(chunkEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, chunk }),
          });
        })
      );
      await db.none(
        `UPDATE "_db"
            SET modifiedon = $/ts/
          WHERE entity = 'copy-to-data-warehouse'`,
        { ts: this_batch_job }
      );
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
