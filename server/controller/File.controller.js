const fs = require("fs");
const path = require("path");
const { File } = require("../models/File.model");
const { uploadFile } = require("../services/storage");

const SingleFileUpload = async (req, res) => {
  try {
    const { user_id, fileId, chunkIndex, totalChunks, originalName, folderId } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    const chunkDir = path.join("temp/chunks", fileId);

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }

    const chunkPath = path.join(chunkDir, String(chunkIndex));
    fs.writeFileSync(chunkPath, req.file.buffer);

    const uploadedChunks = fs.readdirSync(chunkDir).length;

    // If not all chunks uploaded yet
    if (uploadedChunks < totalChunks) {
      return res.json({
        success: true,
        completed: false,
        chunkIndex,
        message: `Chunk ${chunkIndex} uploaded of file-id $ ${fileId}`,
      });
    }

    /* =========== ALL CHUNKS RECEIVED =========== */

    // Merge chunks into a single buffer
    const buffers = [];

    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(chunkDir, `${i + 1}`);
      buffers.push(fs.readFileSync(chunkPath));
    }

    const finalBuffer = Buffer.concat(buffers);

    // Cleanup temp chunks
    fs.rmSync(chunkDir, { recursive: true, force: true });

    const storedName = `${Date.now()}-${originalName}`;
    const folderPath = `user-${user_id || "amitej"}/${folderId || "root"}`;

    const storagePath = await uploadFile(finalBuffer, storedName, folderPath);

    const file = await File.create({
      type: "file",
      user_id: user_id,
      name: originalName,
      stored_name: storedName,
      storage_path: storagePath,
      parent_folder_id: folderId || null,
      storage_type: process.env.STORAGE_TYPE || "local",
    });

    return res.json({
      success: true,
      completed: true,
      file,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const MultiFileUpload = async (req, res) => {};
const FolderUpload = async (req, res) => {};
const CreateFolder = async (req, res) => {};
const DeleteFile = async (req, res) => {};
const DeleteFolder = async (req, res) => {};
const RenameFile = async (req, res) => {};
const RenameFolder = async (req, res) => {};
const MoveFile = async (req, res) => {};

module.exports = {
  SingleFileUpload,
  MultiFileUpload,
  FolderUpload,
  CreateFolder,
  DeleteFile,
  DeleteFolder,
  RenameFile,
  RenameFolder,
  MoveFile,
};
