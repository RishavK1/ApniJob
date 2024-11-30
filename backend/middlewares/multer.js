import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("resume"); // Changed from "file" to "resume"
