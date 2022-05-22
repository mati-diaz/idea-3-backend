const cloudinary = require('cloudinary').v2;
const path = require("path");
const fs = require("fs");

const uploadImg = async (img) => {
  const file = path.join(__dirname, `../../uploads/${img.filename}`);
  const res = await cloudinary.uploader.upload(file);
  console.log(res)
  fs.unlink(file, error => {
    if (error) throw error;
  });
  return res.secure_url;
}

module.exports = uploadImg;