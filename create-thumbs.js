const glob = require("glob");
const sharp = require("sharp");

glob("./static/uploads/*.jpg", (err, files) => {
  files.forEach((file) => {
    console.log(file);
    let filename = file.split("/");
    filename = filename[filename.length - 1];
    sharp(file)
      .resize(600)
      .toFile(`./static/uploads/thumbs/${filename}`);
  });
});
