const multer = require("multer");
const path = require("path");

const createStorage = (userFolder) => {
  return multer.diskStorage({
    destination: (req, res, cb) => {
      const destPath = path.join("./public/image", userFolder);
      cb(null, destPath);
    },

    filename: (req, file, cb) => {
      let prefix = Date.now();
      let fileName = prefix + "_" + file.originalname;
      req.dateValue = prefix;
      cb(null, fileName);
    },
  });
};

const getUploadMiddleware = (userFolder, field, maxCount = null) => {
  const storage = createStorage(userFolder);
  const upload = multer({ storage: storage });
  return maxCount ? upload.array(field, maxCount) : upload.single(field);
};

module.exports = getUploadMiddleware;
