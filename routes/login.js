import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from '../db/felhasznaloQuery.js';
import * as validation from '../middleware/validation.js';
import router from './mainrouter.js';
import { secret } from '../constants.js';

class NevJelszo {
  constructor(nevin, jelszoin) {
    this.nev = nevin;
    this.jelszo = jelszoin;
  }
}

router.post('/loginUser', async (req, res) => {
  try {
    const nevin = req.fields.nev;
    const jelszoin = req.fields.jelszo;

    if (!validation.usercheckLogin(nevin)) {
      res.status(500).render('error', { message: 'Login unsuccessful: Wrong Input' });
      return;
    }

    // find matching user in database
    const salts = await db.findSaltByNev(nevin);
    // console.log(jelszoin, salts);
    // const saltstring = JSON.stringify(salts[0].salt);
    // console.log(saltstring);
    console.log(jelszoin, salts[0].salt);
    const hashJelszo = await bcrypt.hash(jelszoin, salts[0].salt);
    console.log('generalt hashjelszo', hashJelszo);
    const existingUser = new NevJelszo(nevin, hashJelszo);
    const loginid = await db.findFelhasznaloByNevJelszo(existingUser);
    console.log(loginid);
    console.log(loginid.length);
    if (loginid.length === 0) {
      res.status(500).render('error', { message: 'Login unsuccessful: User with specified data not found' });
      return;
    }
    console.log('Successful Login!');
    const token = jwt.sign({ nevin }, secret);
    res.cookie('cookie1', token, { httpOnly: true, sameSite: 'strict' });
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `loginUser unsuccessful: ${err.message}` });
  }
});

router.get('/login', async (req, res) => {
  try {
    // const hirdetesMarka = ['Audi', 'BMW', 'Dacia', 'Ferrari', 'Mercedes'];
    // const hirdetesVaros = ['London', 'Tokyo', 'Seoul', 'Paris', 'Berlin'];
    // res.render('inserteles', { hirdetesMarka, hirdetesVaros });
    res.render('login', {});
  } catch (err) {
    res.status(500).render('error', { message: `LoginMegjelenites unsuccessful: ${err.message}` });
  }
});
export default router;
