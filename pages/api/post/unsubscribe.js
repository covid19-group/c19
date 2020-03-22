import rollbar from '../../../rollbar';
import db from '../../../db';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone } = req.body;
      await db.none(
        `UPDATE person
            SET reminders = false
          WHERE phoneHash = ENCODE(ENCRYPT($/phone/, $/secret/, 'bf'), 'base64')`,
        { phone, secret }
      );
      res.status(200).end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
