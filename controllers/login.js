// import db
const db = require('../db').getConnection();

const bcrypt = require("bcrypt");

// import jwt
const jwt = require('jsonwebtoken');
//import jwt config
const jwtConfig = require('../config/jwt');

// controller untuk login method POST untuk user (cek email dan pass)
// NOTE: Belum ada generator dan simpan TOKEN
const loginPost = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    

    try {
        // mengecek jika email ada di dalam tabel user
        const userData = await db.query('SELECT * FROM users where username =$1 ',[username] );
        console.log(userData.rows)

        //diawali dengan pengecekan username, apabila email tidak ditemukan maka pg module akan mengirimkan error message sehingga pemberian response 'wrong username' dilakukan pada bagian catch


        //apabila username ditemukan maka password pada akun tsb dienkripsi agar bisa dicocokan dengan yang ada di database 
        const encrypredPassword = await bcrypt.compare(password, userData.rows[0].password);
      

        if (!encrypredPassword) { // dilanjutkan mengecek password, apabila password pada email yg digunakan salah maka:
            return res.json({ message: "wrong password", }).status(400)
        }
        const tokenPayload = {
            id: userData.rows[0].id,
            username: userData.rows[0].username,
            email: userData.rows[0].email
        }
        const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

        return res.status(200).json({
            message: "login success",
            token,
        }) // apabila pass sesuai maka login berhasil dan berikan message sukses

    } catch (error) {
        console.log('terjadi error')

        // error yg dikirimkan oleh pg module apabila username tdk ditemukan adalah berupa array kosong
        if (error = []){
          return res.json({ message: "wrong username" }).status(400);
        }
      
        // response berikut diperuntukkan untuk berjaga2 apabila ada error lainnya
        return res.json({ message: error });
    }

}

module.exports = loginPost;