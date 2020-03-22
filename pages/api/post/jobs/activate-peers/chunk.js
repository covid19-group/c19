import db from '../../../../../db';
import rollbar from '../../../../../rollbar';
import { sendSMS } from '../../../../../twilio';
import smsContent from '../../../../../content/sms';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async (req, res) => {
  try {
    const { password, chunk } = req.body;

    if (password === adminPassword) {
      // TODO: have a password check or some security so only we can run the job
      await db.task(async t => {
        await Promise.all(
          chunk.map(async person => {
            sendSMS({
              body: smsContent['en-UK'].activatePeers,
              to: person.phone,
              id: person.id,
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
