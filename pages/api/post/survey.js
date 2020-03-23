import rollbar from '../../../rollbar';
import db from '../../../db';

const secret = process.env.SECRET;
const survey_secret = process.env.SURVEY_SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST' && false) {
      // currently don't allow posting surveys
      const { hasChanged, value, survey } = req.body;
      if (hasChanged === false) {
        await db.task(async t => {
          const { person } = await t.one(
            `SELECT person
            FROM survey
            WHERE id = $/survey/`,
            { survey }
          );
          const lastSurvey = await t.one(
            `SELECT "value"
            FROM SURVEY
            WHERE person = $/person/
              AND id <> $/survey/
            ORDER BY date desc
            LIMIT 1`,
            { person, survey }
          );
          await t.none(
            `UPDATE survey
                SET value = PGP_SYM_ENCRYPT($/value/, $/survey_secret/),
                  modified_on = now()
                WHERE id = $/survey/`,
            { value: lastSurvey.value, survey, survey_secret }
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
