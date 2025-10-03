const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
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

// router.post("/upload-image", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//     req.file.filename
//   }`;
//   res.status(200).json({ imageUrl });
// });

router.post("/upload-image", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific error
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Custom error (e.g. file type filter)
      return res.status(400).json({ message: err.message });
    }

    // No file provided
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Success case
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ imageUrl });
  });
});

module.exports = router;
