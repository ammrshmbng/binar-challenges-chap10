const db = require('../db').getConnection();
const bcrypt = require("bcrypt")

//GET ALL PLAYER
const getAllplayer = async (req, res) => {
    try {
        const player = await db.query('SELECT * FROM users');

        return res.status(200).json({
                massege: "Profile",
                data: player.rows
            });
    } catch (err) {
        console.error(err.massege);
    }
};

//GET ONE PLAYER
const getProfile = async (req, res) => {
    const {id} = req.params
    const profile = await db.query('SELECT * FROM users where id =$1 ',[id] );
    res.status(200).json({
        message: "profile-page",
        data: {
            id: profile.rows[0].id,
            name: profile.rows[0].name,
            username: profile.rows[0].username,
            email: profile.rows[0].email,
            social: profile.rows[0].social,
            point: profile.rows[0].point,
        },
    })
}

// GET ONE PLAYER TO UPDATE
const postUpdateProfile = async (req, res) => {
    const {id} = req.params
    const { name, username, email } = req.body;

    const updateProfile = await db.query('UPDATE users SET name = $2, username = $3, email = $4 WHERE id =$1 ',[id, name, username, email] );
    res.status(200).json({
        message: "profile updated!"
    })
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
}