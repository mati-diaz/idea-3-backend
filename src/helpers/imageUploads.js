const cloudinary = require('cloudinary').v2;
const path = require("path");
const fs = require("fs");

const validTypes = [
  'jpeg',
  'svg+xml',
  'pipeg',
  'x-icon',
  'png'
];

const deleteFile = (file) => {
  fs.unlink(file, error => {
    if (error) throw error;
  });
}

const uploadImg = async (img) => {
  const file = path.join(__dirname, `../../uploads/${img.filename}`);
  const ext = img.mimetype.split('/')[1];
  if (!validTypes.includes(ext)) {
    deleteFile(file);
    throw new Error('Ingrese una imagen valida');
  }
  const res = await cloudinary.uploader.upload(file);
  deleteFile(file);
  return res.secure_url;
}

module.exports = uploadImg;