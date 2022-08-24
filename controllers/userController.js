/* eslint-disable camelcase */
const db = require('../db').getConnection();

// GET ALL PLAYER
// eslint-disable-next-line consistent-return
const getAllplayer = async (req, res) => {
  try {
    const player = await db.query('SELECT * FROM users');

    return res.status(200).json({
      massege: 'Profile',
      data: player.rows,
    });
  } catch (err) {
    console.error(err.massege);
  }
};

// GET ONE PLAYER
const getProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await db.query('SELECT * FROM users where id =$1 ', [id]);
  res.status(200).json({
    message: 'profile-page',
    data: {
      id: profile.rows[0].id,
      name: profile.rows[0].name,
      username: profile.rows[0].username,
      email: profile.rows[0].email,
      social: profile.rows[0].social,
      point: profile.rows[0].point,
      about_me: profile.rows[0].about_me,
    },
  });
};

// GET ONE PLAYER TO UPDATE
const postUpdateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    name, username, email, social, about_me,
  } = req.body;

  // await dimasukkan kedalam variabel agar dapat berjalan, walaupun tidak digunakan,
  // sehingga matikan eslint rule pada line berikut:

  // eslint-disable-next-line no-unused-vars
  const updateProfile = await db.query('UPDATE users SET name = $2, username = $3, email = $4, social = $5, about_me = $6 WHERE id =$1 ', [id, name, username, email, social, about_me]);
  res.status(200).json({
    message: 'profile updated!',
  });
};

// const postUpdateUser = async (req, res) => {
//     const { username, password, email } = req.body;
//     const query = {
//         where: {
//             id: req.params.id,
//         },
//     }
// };
// const profile = user.update({ username, password, email }, query);
// const profiles = user_bio.update(
//     {
//         nama: req.body.nama,
//         socialMedia: req.body.socialMedia,
//         aboutMe: req.body.aboutMe,
//     }, {
//     where: {
//         id_foreign: req.params.id
//     }
// }
// );
// res.status(200).json({
//     massege: "data updated",
//     profile,
//     profiles
// })

module.exports = {
  getAllplayer,
  getProfile,
  postUpdateProfile,
  // getUpdateprofile,
};
