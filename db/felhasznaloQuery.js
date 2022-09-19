import dbConnection from './connection.js';

export const findAllFelhasznalo = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const findFelhasznaloByID = (req) => {
  console.log('findfelhbyid');
  return dbConnection.executeQuery('SELECT * FROM felhasznalo WHERE felhasznalo.id = ?', req);
};

export const findFelhasznaloByNev = (req) => {
  console.log('findfelhbynev');
  return dbConnection.executeQuery('SELECT * FROM felhasznalo WHERE felhasznalo.nev = ?', req);
};

export const insertFelhasznalo = (req) => {
  console.log('insertFelhasznalo');
  console.log(req.nev, req.jelszo, req.szerep);
  return dbConnection.executeQuery('INSERT INTO felhasznalo (nev, jelszo, szerep, salt) VALUES (?, ?, ?, ?)', [req.nev, req.jelszo, req.szerep, req.salt]);
};

export const findFelhasznaloByNevJelszo = (req) => {
  console.log('findFelhasznaloByNevJelszo');
  return dbConnection.executeQuery('SELECT id FROM felhasznalo WHERE felhasznalo.nev = ? AND felhasznalo.jelszo = ?', [req.nev, req.jelszo]);
};

export const deleteAllFelhasznalo = () => {
  const query = 'DELETE * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const findSaltByNev = (req) => {
  console.log('findsaltbynev', req);
  return dbConnection.executeQuery('SELECT salt FROM felhasznalo WHERE felhasznalo.nev = ?', [req]);
};
