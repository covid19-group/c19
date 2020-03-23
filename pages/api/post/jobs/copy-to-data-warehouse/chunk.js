import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import { sendSMS } from '../../../../../twilio';
import smsContent from '../../../../../content/sms';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const pgp = require('pg-promise')();
const dataWarehouse = pgp(process.env.DATA_WAREHOUSE);

export default async (req, res) => {
  try {
    const { password, chunk } = req.body;

    if (password === adminPassword) {
      dataWarehouse.task(async t => {
        await t.batch(
          chunk.map(person => {
            return t.one(
              `insert into "survey"
              (
                id,
                value,
                created_on,
                modified_on,
                date,
                person
              )
              VALUES
              (
                $/id/,
                $/value/,
                $/created_on/,
                $/modified_on/,
                $/date/,
                $/person/
              )
              on conflict (id)
                do update
                set
                  value = $/value/,
                  created_on = $/created_on/,
                  modified_on = $/modified_on/,
                  date = $/date/,
                  person = $/person/
                where "survey".id = $/id/
              returning *`,
              {
                id: person.id,
                value: person.value,
                created_on: person.created_on,
                modified_on: person.modified_on,
                date: person.date,
                person: person.person,
              }
            );
          })
        );
      });
    }
    res.status(200).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
