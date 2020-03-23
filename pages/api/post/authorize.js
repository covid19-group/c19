import db from '../../../db';
import rollbar from '../../../rollbar';
import { sendSMS } from '../../../twilio';
import smsContent from '../../../content/sms';
import { AsYouType, parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone, whatsApp, language } = req.body;
      if (!(phone.slice(0, 3) === '+45')) {
        res.status(400).json({ error: 'wrong_country_code' });
      } else if (isValidNumber(phone)) {
        const { code, id } = await db.task(async t => {
          let person = await db.oneOrNone(
            `SELECT *,
              PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone,
              PGP_SYM_DECRYPT(code::bytea, $/secret/) as code,
              whatsapp
            FROM person
            WHERE phoneHash = ENCODE(ENCRYPT($/phone/, $/secret/, 'bf'), 'base64')`,
            { phone, secret }
          );
          if (!person) {
            const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            person = await db.one(
              `INSERT INTO person (
                phone,
                code,
                whatsapp,
                phoneHash
              ) values (
                PGP_SYM_ENCRYPT($/phone/, $/secret/),
                PGP_SYM_ENCRYPT($/code/, $/secret/),
                $/whatsApp/,
                ENCODE(ENCRYPT($/phone/, $/secret/, 'bf'), 'base64')
              )
              RETURNING *`,
              { phone, secret, whatsApp: whatsApp, code: generatedCode }
            );
            return { ...person, code: generatedCode };
          } else {
            return person;
          }
        });
        await sendSMS({ body: smsContent[language || 'en-UK'].authCode + code, to: phone, id, whatsApp });

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
