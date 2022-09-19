import * as dbfenykep from '../db/fenykepQuery.js';
import router from './mainrouter.js';

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
