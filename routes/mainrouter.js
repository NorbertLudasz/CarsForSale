// Moduláris express router létrehozása

import express from 'express';
import * as db from '../db/hirdetesQuery.js';
import * as validation from '../middleware/validation.js';

const router = express.Router();

router.get(['/', '/index'], async (req, res) => {
  try {
    const hirdetesek = await db.findAllHirdetes();
    res.render('hirdetesek', { hirdetesek });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post('/delete', async (req, res) => {
  try {
    console.log('bementem a deletebe');
    await db.deleteAllHirdetes();
    res.render('hirdetesek', { hirdetes: [] });
  } catch (err) {
    res.status(500).render('error', { message: `Deletion unsuccessful: ${err.message}` });
  }
});

router.post('/searchAuto', async (request, response) => {
  try {
    const ms = request.fields.markasearch;
    const vs = request.fields.varossearch;
    const mina = request.fields.minar;
    const maxa = request.fields.maxar;

    if (!validation.existcheckSearch(ms, vs, mina, maxa)) {
      response.status(500).render('error', { message: 'SearchHirdetes unsuccessful: Missing Input' });
      return;
    }

    if (!validation.searchinputcheck(ms, vs, mina, maxa)) {
      response.status(500).render('error', { message: 'SearchHirdetes unsuccessful: Wrong Input' });
      return;
    }
    const hirdetesek = await db.findSearchHirdetes(request);
    response.render('hirdetesek', { hirdetesek });
  } catch (err) {
    response.status(500).render('error', { message: `SearchHirdetes unsuccessful: ${err.message}` });
  }
});

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
