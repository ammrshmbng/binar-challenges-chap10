// inisiasi dotenv supaya bisa baca dari process.env.*
require('dotenv').config();

// import express
const express = require('express');

// import cors
const cors = require('cors');

// import multer
const multer = require('multer');

// setting express
const app = express();

// import body-parser
const bodyParser = require('body-parser');
const path = require('path');

// atur port
const port = process.env.PORT || '4002';

// import routing
const router = require('./routes');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any());

// implement cors
app.use(cors());

// bodyparser
app.use(bodyParser.json());
// middleware untuk bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(port, () => console.log(`Server menyala pada port ${port}, url: http://localhost:${port}`));
