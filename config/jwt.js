// import dotenv
require('dotenv').config()

// konfigurasi disimpan terpusat di file
// supaya semua kode yang membutuhkan konfigurasi ini memiliki data yang seragam

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ROLEKEY_SECRET = process.env.ROLEKEY_SECRET || 'sayaadmin';

module.exports = {
  JWT_SECRET,
  ROLEKEY_SECRET
}