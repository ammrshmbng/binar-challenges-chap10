const db = require('../db').getConnection();

async function getUsers(req, res) {
  // ambil data dari database
  let dataResult;
  try {
    dataResult = await db.query('SELECT * FROM users');
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }

  // get all tidak perlu pengecekan jika rows berisi atau tidak
  // hal ini mempermudah handling response di sisi frontend karena hasil data selalu berupa array

  // tampilkan hasil
  return res.status(200).json({
    data: dataResult.rows,
    message: 'OK',
  });
}

module.exports = getUsers;
