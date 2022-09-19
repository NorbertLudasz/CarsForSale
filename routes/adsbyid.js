import * as db from '../db/hirdetesQuery.js';
import * as dbfenykep from '../db/fenykepQuery.js';

import router from './mainrouter.js';

router.get('/ads/:id', async (req, res) => {
  try {
    const recievedId = req.params.id;
    // console.log(recievedId);
    const hirdetesek = await db.findHirdetesByID(recievedId);
    const images = await dbfenykep.findAllFenykepByID(recievedId);
    res.render('reszletek', { hirdetesek, images });
  } catch (err) {
    res.status(500).render('error', { message: 'Image Upload By ID unsuccessful' });
  }
});

export default router;
