import rollbar from '../../../rollbar';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { value, authorization } = req.body;
      await db.one(
        `UPDATE survey
            SET value = $/value/,
              modified_on = now()
            WHERE authorization = $/authorization/
          RETURNING *`,
        { value, authorization }
      );
      res.status(200).end();
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
