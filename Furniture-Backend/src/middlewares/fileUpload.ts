import multer, { FileFilterCallback } from "multer";

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // just upload images
    cb(null, "uploads/images");

    // if you want to upload files based on their type, you can uncomment the following code
    // const type = file.mimetype.split("/")[0];
    // if (type === "image") {
    //   cb(null, "uploads/images");
    // } else {
    //   cb(null, "uploads/files");
    // }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: FileFilterCallback): void => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//upload with filesStorage
const upload = multer({
  storage: fileStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

//upload with memoryStorage
export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 5MB
  },
});

export default upload;
