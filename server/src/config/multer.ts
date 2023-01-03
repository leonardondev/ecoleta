import multer from "multer";
import path from "path";
import generateUniqueId from "../utils/generateUniqueId";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename(_request, file, callback) {
      const hash = generateUniqueId();
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
