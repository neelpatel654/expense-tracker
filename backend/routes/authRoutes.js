const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // If there's any multer-specific error, pass it to the next middleware
  // Multer errors will be caught by the error-handling middleware
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

// Error handling middleware for multer errors (like invalid file type)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // If it's a Multer error (e.g., file too large)
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    // Catch any other error
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = router;
