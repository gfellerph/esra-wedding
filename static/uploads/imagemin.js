const glob = require("glob");
const sharp = require("sharp");
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
const jpgtran = require("imagemin-jpegtran");

/* glob("Hochzeit*.jpg", (err, files) => {
  files.forEach((file) => {
    console.log(file);
    sharp(file)
      .resize(2650, 2650, { fit: "inside" })
      .toFile(`temp/${file}`);
  });
}); */
try {
  imagemin(["temp/*.jpg"], {
    destination: "minified",
    plugins: [jpgtran()],
  }).then((files) => console.log(files));
} catch (error) {}
