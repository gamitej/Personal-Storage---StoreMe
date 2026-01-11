const multer = require("multer");

// Multer setup for chunked uploads
const tempChunkUpload = multer({
  storage: multer.diskStorage({
    destination: "temp/chunks",
    filename: (req, _file, cb) => {
      const { fileId, chunkIndex } = req.body;
      const fileName = `${fileId}_${chunkIndex}`;
      cb(null, fileName);
    },
  }),
});

module.exports = { tempChunkUpload };
