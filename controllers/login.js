const bcrypt = require('bcrypt');

// import jwt
const jwt = require('jsonwebtoken');
// import jwt config
const jwtConfig = require('../config/jwt');

// import db
const db = require('../db').getConnection();

// controller untuk login method POST untuk user (cek email dan pass)
const loginPost = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  try {
    // mengecek jika email ada di dalam tabel user
    const userData = await db.query('SELECT * FROM users where username =$1 ', [username]);
    console.log(userData.rows);

    // diawali dengan pengecekan username,
    // apabila email tidak ditemukan maka pg module akan mengirimkan array kosong
    if (userData.rows.length === 0) {
      return res.json({ message: 'wrong username' }).status(400);
    }

    // apabila username ditemukan maka password pada akun tsb dienkripsi,
    // agar bisa dicocokan dengan yang ada di database
    const encrypredPassword = await bcrypt.compare(password, userData.rows[0].password);

    if (!encrypredPassword) { // dilanjutkan mengecek password, apabila salah maka:
      return res.json({ message: 'wrong password' }).status(400);
    }
    const tokenPayload = {
      id: userData.rows[0].id,
      username: userData.rows[0].username,
      email: userData.rows[0].email,
    };
    const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

    // apabila pass sesuai maka login berhasil dan berikan message sukses
    return res.status(200).json({
      message: 'login success',
      token,
    });
  } catch (error) {
    console.log('terjadi error');
    console.log(error);

    // response berikut diperuntukkan untuk berjaga2 apabila ada error lainnya
    return res.json({ message: error });
  }
};

module.exports = loginPost;
