// import client dari pg
const {Pool} = require('pg');

// gunakan variable dari env atau gunakan nilai default
const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbUser = process.env.POSTGRES_USER || 'postgres';
const dbDatabase = process.env.POSTGRES_DATABASE || 'teamone_chap9';
const dbPassword = process.env.POSTGRES_PASSWORD || '1234';
const dbPort = process.env.POSTGRES_PORT || '5433';

// konfigurasi untuk koneksi ke database
const pool = new Pool({
  host: dbHost,
  user: dbUser,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
  ssl: { rejectUnauthorized: false }
});



// fungsi ini akan dipanggil oleh fungsi yg membutuhkan koneksi ke database
const getConnection = () => {
  return pool;
} 

module.exports = {
  getConnection,
}