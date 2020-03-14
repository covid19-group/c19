export default (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'Next.js' });
  } else {
    res.status(502);
  }
};
