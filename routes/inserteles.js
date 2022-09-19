import * as db from '../db/hirdetesQuery.js';
import * as validation from '../middleware/validation.js';
import router from './mainrouter.js';

class Hirdet {
  constructor(markain, varosin, arin, datein) {
    this.marka = markain;
    this.varos = varosin;
    this.ar = arin;
    this.date = datein;
  }
}

router.post('/submitAuto', async (req, res) => {
  try {
    // console.log('bementem a submitautoba');
    const markain = req.fields.marka;
    const varosin = req.fields.varos;
    const arin = req.fields.ar;
    const datein = req.fields.datum;
    console.log(markain, varosin, arin, datein);

    if (!validation.existcheck(markain, varosin, arin, datein)) {
      res.status(500).render('error', { message: 'HirdetesInsertValid unsuccessful: Missing Input' });
      return;
    }
    if (!validation.uploadsearchinputcheck(markain, varosin, arin, datein)) {
      res.status(500).render('error', { message: 'HirdetesInsertValid unsuccessful: Wrong Input' });
      return;
    }

    const ujhirdetes = new Hirdet(markain, varosin, arin, datein);
    // console.log('insert elott');
    await db.insertHirdetes(ujhirdetes);
    console.log('insert utan');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `HirdetesInsertion unsuccessful: ${err.message}` });
  }
});

router.get('/inserteles', async (req, res) => {
  try {
    const hirdetesMarka = ['Audi', 'BMW', 'Dacia', 'Ferrari', 'Mercedes'];
    const hirdetesVaros = ['London', 'Tokyo', 'Seoul', 'Paris', 'Berlin'];
    res.render('inserteles', { hirdetesMarka, hirdetesVaros });
  } catch (err) {
    res.status(500).render('error', { message: `InsertMegjelenites unsuccessful: ${err.message}` });
  }
});

export default router;
