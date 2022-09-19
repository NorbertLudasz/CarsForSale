import * as db from '../db/hirdetesQuery.js';

import router from './mainrouter.js';

router.get('/message/:id', async (req, res) => {
  try {
    const hirdetesID = req.params.id;
    const hirdetesSor = await db.findHirdetesByID(hirdetesID);
    console.log(hirdetesSor);
    res.send(JSON.stringify(hirdetesSor[0]));
    res.end();
  } catch (err) {
    res.status(500).send(JSON.stringify('hiba'));
    res.end();
  }
});

export default router;
