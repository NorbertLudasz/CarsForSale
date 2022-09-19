import jwt from 'jsonwebtoken';
import { secret } from '../constants.js';

export default async function logincheck(req, res, next) {
  try {
    const cookieValue = req.cookies.cookie1;
    if (cookieValue === 'undefined') {
      res.redirect('/login');
    } else {
      await jwt.verify(cookieValue, secret, (error, cookieContent) => {
        res.locals.nev = cookieContent.nevin;
        next();
      });
    }
  } catch (err) {
    res.clearCookie('cookie1');
    res.clearCookie();
    res.status(500).render('error', { message: `loginchecker error: ${err.message}` });
  }
}
