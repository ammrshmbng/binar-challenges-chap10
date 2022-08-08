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
    // const userData = await user.findOne({
    //   where: {
    //       username: username,
    //   },
    //   });
    const userData = await db.query('SELECT * FROM users where username =$1 ',[username] );
   

    if (!userData.rows[0].username) { // dilanjutkan mengecek email, apabila email tidak ditemukan maka:        
      // return res.json({message: "wrong username",})
      return res.json({ message: "wrong username", }).status(400)
    }

    const encrypredPassword = await bcrypt.compare(password, userData.rows[0].password);
   

    if (!encrypredPassword) { // dilanjutkan mengecek password, apabila password pada email yg digunakan salah maka:
        // return res.json({message: "wrong password",})
        return res.json({ message: "wrong password", }).status(400)
    }
    const tokenPayload = {
        id: userData.id,
        username: userData.rows[0].username,
        email: userData.rows[0].email
    }
    const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

    return res.status(200).json({
        message: "login success",
        userData: userData.rows,
        token,
    }) // apabila pass sesuai maka login berhasil dan berikan message sukses

} catch (error) {
  return res.json(error);
}



    
}

// async function getUsers(req,res){
//     // ambil data dari database
//     let dataResult;
//     try {
//       dataResult = await db.query('SELECT * FROM users');
//     } catch (err) {
//       // jika gagal, berikan response gagal
//       return res.status(500).json({
//         message: 'Operation failed',
//       });
//     }
  
//     // get all tidak perlu pengecekan jika rows berisi atau tidak
//     // hal ini mempermudah handling response di sisi frontend karena hasil data selalu berupa array
   
//     // tampilkan hasil
//     return res.status(200).json({
//       data: dataResult.rows,
//       message: 'OK',
//     });
// }

module.exports = loginPost;