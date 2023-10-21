// const cloudinary = require('cloudinary').v2;
//convert the above statement to ES6 syntax
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
// import cloudinary from 'cloudinary';
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "djfsmacxz",
  api_key: "591892176849886",
  api_secret: "7FIqEzZjmPC0m2mJnyO5VIAtgPI",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Ann-Data",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
// module.exports = {
//   cloudinary,
//   storage
// }
export { cloudinary, storage };
