import rollbar from '../../../rollbar';
import db from '../../../db';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { survey } = req.body;
      const newSurvey = await db.task(async t => {
        //"authenticate" you via the survey
        const { person } = await t.one(
          `SELECT person
            FROM survey
            WHERE id = $/survey/`,
          { survey }
        );

        const participant = await t.one(
          `insert into "participant" (
            person
          ) values (
            $/person/
          )
          RETURNING *`,
          { person }
        );

        const newSurvey = await t.oneOrNone(
          `INSERT INTO survey  (
              person,
              participant
            ) VALUES (
              $/person/,
              $/participant/
            )
            RETURNING id`,
          { person, participant: participant.id }
        );

        return newSurvey;
      });
      res.status(200).json({ survey: newSurvey });
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
