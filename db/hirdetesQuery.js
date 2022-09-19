import dbConnection from './connection.js';

export const findSearchHirdetes = (req) => {
  console.log('findsearchhirdetesbeli parameterek:');
  console.log(req.fields.markasearch, req.fields.varossearch, req.fields.minar, req.fields.maxar);
  return dbConnection.executeQuery(
    `SELECT * FROM hirdetes WHERE hirdetes.marka LIKE 
    ? AND hirdetes.varos LIKE ? AND hirdetes.ar > ? AND hirdetes.ar < ?`,
    [req.fields.markasearch, req.fields.varossearch, req.fields.minar, req.fields.maxar],
  );
};

export const findAllHirdetes = () => {
  const query = 'SELECT * FROM hirdetes';
  return dbConnection.executeQuery(query);
};

export const findHirdetesByID = (req) => {
  console.log('findhirdbyid');
  return dbConnection.executeQuery('SELECT * FROM hirdetes WHERE hirdetes.id = ?', req);
};

export const findAllMarka = () => {
  const query = 'SELECT DISTINCT hirdetes.marka FROM hirdetes';
  return dbConnection.executeQuery(query);
};

export const findAllVaros = () => {
  const query = 'SELECT DISTINCT hirdetes.varos FROM hirdetes';
  return dbConnection.executeQuery(query);
};

export const insertHirdetes = (req) => {
  console.log('insertHirdetes');
  return dbConnection.executeQuery('INSERT INTO hirdetes (marka, varos, ar, date) VALUES (?, ?, ?, ?)', [req.marka, req.varos, req.ar, req.date]);
};

export const deleteAllHirdetes = () => {
  const query = 'DELETE FROM hirdetes';
  return dbConnection.executeQuery(query);
};
