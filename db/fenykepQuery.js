import dbConnection from './connection.js';

export const findAllFenykep = () => {
  const query = 'SELECT * FROM fenykep';
  return dbConnection.executeQuery(query);
};

export const findAllFenykepByID = (id) => {
  console.log('findallfenykepbyid');
  return dbConnection.executeQuery('SELECT * FROM fenykep WHERE fenykep.hirdid = ?', id);
};

export const insertFenykep = (imageid, imagename) => {
  console.log(imagename, imageid);
  return dbConnection.executeQuery('INSERT INTO fenykep (nev, hirdid) VALUES (?, ?)', [imagename, imageid]);
};

export const deleteAllFenykep = () => {
  const query = 'DELETE FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const deleteFenykepById = (id) => {
  console.log('fenykepDelete');
  return dbConnection.executeQuery('DELETE FROM fenykep WHERE fenykep.id = ?', id);
};
