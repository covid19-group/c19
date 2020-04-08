import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import { sendBulk } from '../../../../../twilio';
import smsContent from '../../../../../content/sms';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async (req, res) => {
  try {
    const { password, chunk } = req.body;
    if (password === adminPassword) {
      await db.task(async t => {
        await Promise.all(
          chunk.map(async person => {
            await t.one(
              `INSERT INTO "message_log"  (
                person,
                type
              ) VALUES (
                $/person/,
                'announcement'
              )
              RETURNING *`,
              { person: person.id }
            );
          })
        );
      });
      await sendBulk({
        body: smsContent['da-DK'].announcement,
        numbers: chunk.map(person => person.phone),
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
