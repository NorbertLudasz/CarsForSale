import dbConnection from './connection.js';

export const createTable = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS requests (
      method varchar(20),
      url varchar(50),
      date varchar(50));
     `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS hirdetes (
      id int auto_increment,
      marka varchar(20),
      varos varchar(20),
      ar int,
      date varchar(50),
      primary key (id));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
      id int auto_increment,
      nev varchar(100),
      jelszo varchar(1000),
      szerep varchar(100),
      salt varchar(100),
      primary key (id));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS fenykep (
      id int auto_increment,
      nev varchar(100),
      hirdid int,
      primary key (id));
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

export default createTable;
