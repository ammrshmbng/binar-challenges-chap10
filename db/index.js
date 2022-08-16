// import client dari pg
const {Pool} = require('pg');

// gunakan variable dari env atau gunakan nilai default
// const dbHost = process.env.POSTGRES_HOST || 'localhost';
// const dbUser = process.env.POSTGRES_USER || 'postgres';
// const dbDatabase = process.env.POSTGRES_DATABASE || 'teamone_chap9';
// const dbPassword = process.env.POSTGRES_PASSWORD || '1234';
// const dbPort = process.env.POSTGRES_PORT || '5433';

// menggunakan config Heroku
const dbHost = 'ec2-34-193-44-192.compute-1.amazonaws.com';
const dbUser = 'jmpniwefhiccgo';
const dbDatabase = 'd5tgebhkm6rci3';
const dbPassword = '9da44476d29e326f02fa4dd1c8b970c1b48594141c731bc5611562f867773482';
const dbPort = '5432';

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