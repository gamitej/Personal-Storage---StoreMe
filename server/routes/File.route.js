const express = require("express");
const {
  SingleFileUpload,
  MultiFileUpload,
  FolderUpload,
  CreateFolder,
  DeleteFile,
  DeleteFolder,
  RenameFile,
  RenameFolder,
  MoveFile,
} = require("../controller/File.controller");
const { upload } = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/upload", upload.single("file"), SingleFileUpload); // Single file upload
router.post("/upload-multiple", MultiFileUpload); // Multiple file upload
router.post("/upload-folder", FolderUpload); //  Folder upload
router.post("/folders/create", CreateFolder); // Create new folder
router.delete("/:id", DeleteFile); // Delete file by id
router.delete("/folders/:id", DeleteFolder); // Delete folder by id
router.put("/:id/rename", RenameFile); // Rename file by id
router.put("/folders/:id/rename", RenameFolder); // Rename folder by id
router.put("/:id/move", MoveFile); // Move file to another folder

module.exports = router;
