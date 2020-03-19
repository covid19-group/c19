import rollbar from '../../../rollbar';
import db from '../../../db';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { survey } = req.body;
      await db.task(async t => {
        const { person } = await t.one(
          `SELECT person
          FROM survey
          WHERE id = $/survey/`,
          { survey }
        );
        await t.none(
          `UPDATE person
            SET reminders = true
          WHERE id = $/person/`,
          { person }
        );
      });
      res.status(200).end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
