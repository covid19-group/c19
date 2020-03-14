import db from '../../db';

export default async (req, res) => {
  const secret = process.env.SECRET;
  const now = new Date();
  const today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + ow.getDate();

  if (req.method === 'POST') {
    const { phone } = JSON.parse(req.body);
    const person = await db.task(async t => {
      let person = await db.oneOrNone(
        `
        SELECT *
        FROM person
        WHERE PGP_SYM_DECRYPT(phone::bytea, $/secret/) = $/phone/`,
        { phone, secret }
      );
      if (!person) {
        person = await db.one(
          `
        INSERT INTO person (
          phone
        ) values (
          PGP_SYM_ENCRYPT($/phone/, $/secret/)
        )`,
          { phone, secret }
        );
      }
      return person;
    });

    res.status(200);
  } else {
    res.status(502);
  }
};
