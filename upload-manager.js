const random = require("uuid-random");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "./uploads/");
  },
  filename: (req, file, next) => {
    next(null, random());
  },
});

const filter = (req, file, next) => {
  file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"
    ? next(null, true)
    : next({ message: "Unsupported File Format" }, null);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024 },
    fileFilter: filter
})

module.exports = upload