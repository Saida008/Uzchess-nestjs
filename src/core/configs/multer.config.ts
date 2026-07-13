//static fayllar bn ishlash

// static filelar bilan ishlash
import { diskStorage } from "multer";
import fs from 'fs' 
import { join } from "path";
interface Params {
  destination: string;
  extensions: string[];
}

export function multerStorageOptions({ destination, extensions }: Params) {
  return {
    storage: diskStorage({
      filename: (req, file, callback) => {
       const extension = file.originalname
         .split(".")
         .at(-1)
         ?.toLowerCase();

      if (!extension || !extensions.includes(extension)) {
          return callback(
            new Error("this extension is not allowed."),
            "",
          );
        }

        const fileName = `file_${Date.now()}.${extension}`;

        callback(null, fileName);
      },

      destination: (req, file, callback) => {
        const path=join(__dirname,'../../..', 'uploads', destination);
      if (!fs.existsSync(path)) {
     fs.mkdirSync(path, { recursive: true });
}
        callback(null, path);
      },
    }),
  };
}