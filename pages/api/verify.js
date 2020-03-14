import db from '../../db';
import rollbar from '../../rollbar';
import crypto from '../methods/crypto';

const secret = process.env.SECRET;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { phone, code } = req.body;
      const person = await db.oneOrNone(
        `SELECT *,
          PGP_SYM_DECRYPT(phone::bytea, $/secret/) as phone,
          PGP_SYM_DECRYPT(code::bytea, $/secret/) as code
        FROM person
        WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/
          AND PGP_SYM_DECRYPT(code::bytea, $/secret/) = $/code/`,
        { phone, code, secret }
      );
      if (person) {
        res
          .status(200)
          .json({ authorization: crypto.encrypt({ phone, code }) })
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
