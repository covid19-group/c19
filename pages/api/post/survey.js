import rollbar from '../../../rollbar';
import db from '../../../db';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { value, survey } = req.body;
      await db.one(
        `UPDATE survey
            SET value = $/value/,
              modified_on = now()
            WHERE id = $/survey/
          RETURNING *`,
        { value, survey }
      );
      res.status(200).end();
    } else res.status(502).end();
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
