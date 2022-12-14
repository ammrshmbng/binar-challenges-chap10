const bcrypt = require('bcrypt');

// import db
const db = require('../db').getConnection();

const saltRound = Number(process.env.APP_HASH_ROUND) || 10;

const register = async (req, res) => {
  try {
    // buat sandi encrypted dengan bcrypt
    const {
      name, username, email, password,
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    //

    const isExist = await db.query('SELECT * FROM users where username =$1 ', [username]);
    // return res.json(isExist.rows[0]?.username);

    if (isExist.rows[0]?.username) {
      console.log('isExist');
      return res.status(400).json({
        message: 'username already registered',
      });
    }
    console.log('berhasil');

    db.query(
      'INSERT INTO users(name,username,email,password,point) VALUES ($1,$2,$3,$4,0)',
      [name, username, email, encryptedPassword],
    );

    return res.status(200).json({
      message: 'anda berhasil register',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      errorMessage: error,
    });
  }
};

module.exports = register;
