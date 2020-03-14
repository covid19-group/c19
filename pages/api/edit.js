import rollbar from '../../rollbar';
import crypto from '../methods/crypto';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone, authorization } = req.body;
      const parsedAuthorization = crypto.decrypt(authorization);
      const isValid = parsedAuthorization.phone === phone;
      if (isValid) {
        const { zip, born, sex } = await db.one(
          `SELECT zip, born, sex
            FROM person
            WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
          { phone, secret }
        );
        res
          .status(200)
          .json({ zip, born, sex })
          .end();
      } else res.status(401).end();
    } else res.status(502).end();
  } catch (error) {
    rollbar.error(error);
    res
      .status(500)
      .json({ error })
      .end();
  }
};
