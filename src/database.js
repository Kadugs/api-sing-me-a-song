import pg from 'pg';

const { Pool } = pg;

const localConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connecion = new Pool(localConfig);

export default connecion;
