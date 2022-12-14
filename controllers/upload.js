// import cloudinary uploader
const cloud = require('../lib/cloudinary');
// import db
const db = require('../db').getConnection();

const uploadPicture = async (req, res) => {
  // baca dari files, jika tidak ada, beri nilai []
  const file = req.files || [];
  const { id } = req.params;

  // upload foto
  let fileURL = '';
  if (file.length) {
    try {
      fileURL = await cloud.upload(file[0]); // hanya upload 1 file
    } catch (err) {
      return res.status(500).json({
        message: 'Terjadi kesalahan.',
      });
    }
  }

  db.query('UPDATE users SET image_url = $1 WHERE id =$2 ', [fileURL, id]);

  // berikan response sukses
  return res.status(201).json({
    message: 'Berhasil menambahkan gambar.',
    url: fileURL,
  });
};

//   const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//   console.log(req.file);
//   console.log(req.body);
//   res.status(200).json({
//     message: 'Upload success',
//     data: {
//       name: req.body.name,
//       image: imageURL,
//       path: req.file.path,
//     },
//   });
// };

module.exports = uploadPicture;
