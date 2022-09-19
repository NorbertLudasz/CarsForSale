export default async function requestLogger(req, res, next) {
  try {
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
}
