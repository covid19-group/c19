import rollbar from '../../../../rollbar';
import db from '../../../../db';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const phone = await db.task(async t => {
        const { person } = await t.one(
          `SELECT *
            FROM survey
            WHERE id = $/id/`,
          { id }
        );
        const { phone } = await db.oneOrNone(
          `SELECT PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone
          FROM person
          WHERE id = $/id/`,
          { secret, id: person }
        );
        return phone;
      });
      res
        .status(200)
        .json({ phoneLastFourDigits: phone.substr(phone.length - 4) })
        .end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res
      .status(500)
      .json({ error })
      .end();
  }
};
