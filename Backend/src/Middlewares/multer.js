import multer from "multer";

const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, "./public/temp");
  },

  filename: function (cb, file) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
