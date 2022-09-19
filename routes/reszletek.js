import * as p from 'path';
import * as db from '../db/hirdetesQuery.js';
import * as dbfenykep from '../db/fenykepQuery.js';
import * as validation from '../middleware/validation.js';

import router from './mainrouter.js';

router.post('/uploadImage', async (request, response) => {
  try {
    // az állományok a request.files-ban lesznek
    const fileHandler = request.files.feltoltesfoto;
    const imageid = parseInt(request.fields.feltoltesid, 10);

    if (!validation.existcheckimage(fileHandler)) {
      response.status(500).render('error', { message: 'ImageValidation unsuccessful: Missing Input' });
      return;
    }
    const rgx = String(imageid).match(/[0-9]*/);
    if (!rgx) {
      response.status(500).render('error', { message: 'ImageValidation unsuccessful: Wrong Input' });
      return;
    }

    const hirdetesek = await db.findHirdetesByID(imageid);
    const filepath = p.join('/', fileHandler.path.split(p.sep).splice(-1)[0]);
    await dbfenykep.insertFenykep(imageid, filepath);
    const images = await dbfenykep.findAllFenykep(imageid);

    const respLog = `Feltoltes erkezett:
    allomanynev: ${fileHandler.name}
    nev a szerveren: ${fileHandler.path}\n`;
    console.log(respLog);
    response.render('reszletek', { hirdetesek, images });
  } catch (err) {
    response.status(500).render('error', { message: 'Image Upload unsuccessful' });
  }
});

router.delete('/imagedel/:id', async (req, res) => {
  try {
    const imageid = req.params.id;
    console.log(imageid);
    await dbfenykep.deleteFenykepById(imageid);
    console.log('after delete');
    res.status(204);
    res.end();
  } catch (err) {
    res.status(500).render('error', { message: 'imagedel routerget unsuccessful' });
  }
});

export default router;
