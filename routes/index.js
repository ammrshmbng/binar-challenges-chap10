const router = require('express').Router();
// const multer = require('multer');

// PENGATURAN STORAGE UNTUK MULTER
// const myStorage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: (req, file, callback) => {
//     callback(null, file.originalname); // upload dengan nama asli
//   },
// });

// middleware untuk upload dengan multer
// const upload = multer({ storage: myStorage });

// import controllers
const getUsers = require('../controllers/getUsers');
const loginPost = require('../controllers/login');
const register = require('../controllers/register');
const { getAllplayer } = require('../controllers/userController');
const { getProfile } = require('../controllers/userController');
const { postUpdateProfile } = require('../controllers/userController');
const uploadPicture = require('../controllers/upload');

router.get('/api/users', getUsers);

router.post('/api/login', loginPost);

router.post('/api/register', register);

router.get('/api/users', getAllplayer);

router.get('/api/users/:id', getProfile);

router.post('/api/update/:id', postUpdateProfile);

router.post('/api/upload/:id', uploadPicture);

module.exports = router;
