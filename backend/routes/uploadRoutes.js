import express from "express";

//modules
import path from "path";

//libraries
import multer from "multer";

const router = express.Router();
//describe where we want our image to go (what storage)
const storage = multer.diskStorage({
  //destination describes where we want to save. cb is callback. null pertains to an error, second is the path. uploads is in the root.
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  //how we want file names to be formatted
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//check the file type. console log the file object.
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
});

//'image' is equivalent to fieldname, above
router.post("/", upload.single("image"), (req, res) => {
  res.send({ message: "image uploaded", image: `/${req.file.path}` });
});
export default router;
