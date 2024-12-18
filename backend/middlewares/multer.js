import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = (fieldName) =>
  multer({ storage }).single(fieldName);
