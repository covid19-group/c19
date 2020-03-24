import rollbar from '../../../rollbar';
import db from '../../../db';
const survey_secret = process.env.SURVEY_SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { hasChanged, value, survey } = req.body;
      if (hasChanged === false) {
        await db.task(async t => {
          const { person } = await t.one(
            `SELECT person
            FROM survey
            WHERE id = $/survey/`,
            { survey }
          );
          await t.none(
            `UPDATE survey
                SET value = (
                    SELECT "value"
                    FROM SURVEY
                    WHERE person = $/person/
                      AND id <> $/survey/
                    ORDER BY date desc
                    LIMIT 1
                  ),
                  modified_on = now()
                WHERE id = $/survey/`,
            { survey, person }
          );
        });
      } else {
        await db.none(
          `UPDATE survey
              SET value = PGP_SYM_ENCRYPT($/value/, $/survey_secret/),
                modified_on = now()
              WHERE id = $/survey/`,
          { value, survey, survey_secret }
        );
      }
      res.status(200).end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
