import db from '../../../db';
import rollbar from '../../../rollbar';
import { sendSMS } from '../../../twilio';
import smsContent from '../../../content/sms';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone, language } = req.body;
      if (!(phone.slice(0, 3) === '+45')) {
        res.status(400).json({ error: 'wrong_country_code' });
      }
      if (isValidNumber(phone)) {
        const code = await db.task(async t => {
          let person = await db.oneOrNone(
            `SELECT *,
              PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone,
              PGP_SYM_DECRYPT(code::bytea, $/secret/) as code
            FROM person
            WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
            { phone, secret }
          );
          if (!person) {
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            person = await db.one(
              `INSERT INTO person (
                phone,
                code
              ) values (
                PGP_SYM_ENCRYPT($/phone/, $/secret/),
                PGP_SYM_ENCRYPT($/code/, $/secret/)
              )
              RETURNING *`,
              { phone, secret, code: generatedCode }
            );
            return generatedCode;
          } else {
            return person.code;
          }
        });
        await sendSMS({ body: smsContent[language || 'en-UK'].authCode + code, to: phone });

        res.status(200).end();
      } else {
        res.status(400).end();
      }
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
