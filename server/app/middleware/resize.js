const sharp = require("sharp");
const resize = sharp(req.files[0].path)
  .resize(262, 317)
  .toFile("./uploads/" + "262x317-" + req.files[0].filename, function (err) {
    if (err) {
      console.error("sharp>>>", err);
    }
    console.log("ok okoko");
  });
module.exports = resize;
