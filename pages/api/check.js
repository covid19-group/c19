import rollbar from '../../rollbar';
import crypto from '../methods/crypto';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { authorization } = req.body;
      const { phone } = crypto.decrypt(authorization);
      const existing = await db.task(async t => {
        const person = await t.one(
          `SELECT id
            FROM person
            WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
          { phone, secret }
        );
        return await t.one(
          `SELECT *
            FROM registration
            WHERE date = current_date
              AND person = $/person/`,
          { person: person.id }
        );
      });
      res
        .status(200)
        .json({ existing: !!existing })
        .end();
    } else res.status(502).end();
  } catch (error) {
    rollbar.error(error);
    res
      .status(500)
      .json({ error })
      .end();
  }
};
