import db from '../../../db';
import rollbar from '../../../rollbar';
import { sendSMS } from '../../../twilio';
import smsContent from '../../../content/sms';
const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (false) {
      const { password } = req.query;
      // TODO: have a password check or some security so only we can run the job
      await db.task(async t => {
        const results = await t.any(
          `SELECT
            id,
            last_reminded::date,
            PGP_SYM_DECRYPT(phone::bytea, $/secret/) AS phone
        FROM person
        WHERE
            last_reminded::date < now()::date and reminders`,
          { secret }
        );

        await Promise.all(
          results.map(async person => {
            const updatedPerson = await t.oneOrNone(
              `update "person" set last_reminded = now() where id = $/id/ and last_reminded::date < now()::date returning *`,
              { id: person.id }
            );
            if (updatedPerson) {
              const survey = await t.one(
                `INSERT INTO survey  (
                  person
                ) VALUES (
                  $/person/
                )
                RETURNING *`,
                { person: person.id }
              );
              await sendSMS({
                body: smsContent['en-UK'].followUpSurvey + survey.id + '. ' + smsContent['en-UK'].unsubscribe,
                to: person.phone,
              });
            }
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
