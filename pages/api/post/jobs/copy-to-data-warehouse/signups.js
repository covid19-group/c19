import db from '../../../../../db';
import dwh from '../../../../../dwh';
import rollbar from '../../../../../rollbar';
const secret = process.env.SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

export default async (req, res) => {
  try {
    const { password } = req.body;
    if (password === adminPassword) {
      const data = await db.any(`
        select
               created_on::date as date,
               extract(hour from created_on) as time,
               count(*) as count
        from person
        group by
               created_on::date,
               extract(hour from created_on)
        order by date desc, "time" desc;`);
      await dwh.task(async t => {
        await t.none('truncate signups');
        await t.batch(
          data.map(row => {
            return t.one(
              `insert into signups
              (
                date,
                time,
                count
              )
              VALUES
              (
                $/date/,
                $/time/,
                $/count/
              )`,
              row
            );
          })
        );
      });
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.error(error);
    rollbar.error(error);
    res.status(500).end();
  }
};
