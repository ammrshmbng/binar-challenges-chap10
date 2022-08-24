const uploadPicture = async (req, res) => {
  const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log(req.file);
  console.log(req.body);
  res.status(200).json({
    message: 'Upload success',
    data: {
      name: req.body.name,
      image: imageURL,
      path: req.file.path,
    },
  });
};

module.exports = uploadPicture;
