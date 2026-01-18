const express = require("express");
const {
  FilesUpload,
  FolderUpload,
  CreateFolder,
  DeleteFile,
  DeleteFolder,
  RenameFile,
  RenameFolder,
  MoveFile,
  getUserFiles,
} = require("../controller/File.controller");
const { upload } = require("../middleware/upload.middleware");

const router = express.Router();

router.get("/user", getUserFiles);
router.post("/upload", upload.single("file"), FilesUpload);
router.post("/upload-folder", FolderUpload); 
router.post("/folders/create", CreateFolder); 
router.delete("/:id", DeleteFile); 
router.delete("/folders/:id", DeleteFolder); 
router.put("/:id/rename", RenameFile); 
router.put("/folders/:id/rename", RenameFolder); 
router.put("/:id/move", MoveFile); 

module.exports = router;
