import db from '../../../db';
import rollbar from '../../../rollbar';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone, code } = req.body;
      const { id } = await db.task(async t => {
        const person = await t.oneOrNone(
          `SELECT *,
            PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone,
            PGP_SYM_DECRYPT(code::bytea, $/secret/) as code
          FROM person
          WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/
            AND PGP_SYM_DECRYPT(code::bytea, $/secret/) = $/code/`,
          { phone, code, secret }
        );
        if (!person) return {};
        let survey = await t.oneOrNone(
          `SELECT *
          FROM survey
          WHERE person = $/person/
            AND date = current_date`,
          { person: person.id }
        );
        if (!survey) {
          survey = await t.oneOrNone(
            `INSERT INTO survey  (
                person
              ) VALUES (
                $/person/
              )
              RETURNING *`,
            { person: person.id }
          );
        }
        return { id: survey.id };
      });
      if (id) {
        res.json({ id });
      } else res.status(401).end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
