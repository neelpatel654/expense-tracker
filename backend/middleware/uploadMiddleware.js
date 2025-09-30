const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);

    // Set custom error message in req.fileValidationError
    req.fileValidationError = "Only .jpeg, .jpg, and .png formats are allowed";
    cb(null, false); // Don't proceed with the upload
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
