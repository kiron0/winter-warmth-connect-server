import multer from "multer";

export const upload = multer({
          storage: multer.diskStorage({}),
          fileFilter: (req, file, cb) => {
                    if (
                              file.mimetype === "image/png" ||
                              file.mimetype === "image/jpg" ||
                              file.mimetype === "image/jpeg" ||
                              file.mimetype === "image/webp"
                    ) {
                              cb(null, true);
                    } else {
                              cb(new Error("Only .png, .jpg, or .jpeg file allowed."));
                    }
          },
});