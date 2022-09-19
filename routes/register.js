import * as bcrypt from 'bcrypt';
import * as db from '../db/felhasznaloQuery.js';
import * as validation from '../middleware/validation.js';
import router from './mainrouter.js';
import { secret } from '../constants.js';
// <span><a href="/register">Register</a></span>
// <span><a href=/login>Login</a></span>
// in navbar
class Person {
  constructor(nevin, jelszoin, szerepin, saltin) {
    this.nev = nevin;
    this.jelszo = jelszoin;
    this.szerep = szerepin;
    this.salt = saltin;
  }
}

router.post('/registerUser', async (req, res) => {
  try {
    const nevin = req.fields.nev;
    const jelszoin = req.fields.jelszo;
    const szerepin = req.fields.szerep;
    console.log(nevin, jelszoin, szerepin);

    if (!validation.usercheckReg(nevin, szerepin)) {
      res.status(500).render('error', { message: 'RegisterUser unsuccessful: Wrong Input' });
      return;
    }

    const userID = await db.findFelhasznaloByNev(nevin);
    console.log(userID.length);
    if (userID.length) {
      res.status(500).render('error', { message: 'RegisterUser unsuccessful: Username already taken' });
      return;
    }

    // const salt = await bcrypt.genSalt();
    const salt = secret;
    const hashJelszo = await bcrypt.hash(jelszoin, salt);
    console.log(salt, hashJelszo);
    const ujUser = new Person(nevin, hashJelszo, szerepin, salt);
    // console.log('insert elott');
    await db.insertFelhasznalo(ujUser);
    console.log('insert utan');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: 'registerUser unsuccessful' });
  }
});

router.get('/register', async (req, res) => {
  try {
    // const hirdetesMarka = ['Audi', 'BMW', 'Dacia', 'Ferrari', 'Mercedes'];
    // const hirdetesVaros = ['London', 'Tokyo', 'Seoul', 'Paris', 'Berlin'];
    // res.render('inserteles', { hirdetesMarka, hirdetesVaros });
    res.render('register', {});
  } catch (err) {
    res.status(500).render('error', { message: `RegisterMegjelenites unsuccessful: ${err.message}` });
  }
});
export default router;
