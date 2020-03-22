import db from '../../../db';
import rollbar from '../../../rollbar';
import { sendSMS } from '../../../twilio';
import smsContent from '../../../content/sms';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async (req, res) => {
  try {
    const { password } = req.body;

    if (password === adminPassword) {
      // TODO: have a password check or some security so only we can run the job
      await db.task(async t => {
        const results = await t.any(
          `SELECT
  p.id,
  p.last_reminded::date,
  PGP_SYM_DECRYPT((p.phone)::bytea, $/secret/) AS phone
FROM person p
WHERE
  reminders
  and verified
  and NOT EXISTS (
    select l.id from "message_log" l
      where l.person = p.id
      and l.type = 'activate_peers'
  )`,
          { secret }
        );

        await Promise.all(
          results.map(async person => {
            await sendSMS({
              body: smsContent['en-UK'].activatePeers,
              to: person.phone,
            });

            const messageLog = await t.one(
              `INSERT INTO "message_log"  (
                person,
                type
              ) VALUES (
                $/person/,
                'activate_peers'
              )
              RETURNING *`,
              { person: person.id }
            );

            return;
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
