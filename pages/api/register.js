import rollbar from '../../rollbar';
import crypto from '../methods/crypto';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { value, authorization } = req.body;
      const { phone } = crypto.decrypt(authorization);
      await db.task(async t => {
        const person = await t.one(
          `SELECT id
            FROM person
            WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
          { phone, secret }
        );
        await t.one(
          `INSERT INTO registration  (
              created_on,
              modified_on,
              date,
              value,
              person
            ) VALUES (
              now(),
              now(),
              current_date,
              $/value/,
              $/person/
            )
            ON CONFLICT ON (person, date)
            DO UPDATE registration
              SET value = $/value/,
                modified_on = now()
              WHERE date = current_date
                AND person = $/person/
            RETURNING *`,
          { value, person: person.id }
        );
      });
      res.status(200).end();
    } else res.status(502).end();
  } catch (error) {
    rollbar.error(error);
    res
      .status(500)
      .json({ error })
      .end();
  }
};
