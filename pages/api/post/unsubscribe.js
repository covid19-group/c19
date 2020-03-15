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
          WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
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
