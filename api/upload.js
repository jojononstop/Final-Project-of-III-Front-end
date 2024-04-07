import formidable from "formidable";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  let imageUrl = "";
  let oldPath = "";
  let newPath = "";

  const form = formidable({ multiples: true });
  const data = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      if (!files.photo) {
        resolve({
          status: "error",
          message: "Please upload a photo with name photo in the form",
        });
      }
      if (files.photo.mimetype.startsWith("image/")) {
        let imageName =
          Date.now() +
          Math.round(Math.random() * 100000) +
          files.photo.originalFilename;
        oldPath = files.photo.filepath;
        newPath = `${path.join("public", "uploads", imageName)}`;
        imageUrl = "./public/upload/" + imageName;
        fs.copyFileSync(oldPath, newPath);
        resolve({
          status: "ok",
          url: imageUrl,
        });
      } else {
        resolve({
          status: "error",
          message: "Please upload nothing but images.",
        });
      }
    });
  });
  return data;
});