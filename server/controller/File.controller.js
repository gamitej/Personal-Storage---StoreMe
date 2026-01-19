const fs = require("fs").promises;
const path = require("path");
const { File } = require("../models/File.model");
const { uploadFile } = require("../services/storage");
const { uploadSchema } = require("./zodSchema");

const { STORAGE_TYPE } = process.env;

// ================================= FILE'S UPLOAD ==================================

const FilesUpload = async (req, res) => {
  try {
    const validation = uploadSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "File validation failed",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const {
      userId,
      fileId,
      chunkIndex,
      totalChunks,
      originalName,
      folderId,
      mimeType,
      size,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    const chunkDir = path.join("temp-chunks", fileId);

    await fs.mkdir(chunkDir, { recursive: true });

    const chunkPath = path.join(chunkDir, String(chunkIndex));

    await fs.writeFile(chunkPath, req.file.buffer);

    const uploadedChunks = (await fs.readdir(chunkDir)).length;

    // If not all chunks uploaded
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
      buffers.push(await fs.readFile(chunkPath));
    }

    const finalBuffer = Buffer.concat(buffers);

    // Cleanup temp chunks
    await fs.rm(chunkDir, { recursive: true, force: true });

    const storedName = `${Date.now()}-${originalName}`;

    const folderPath = folderId
      ? `user/${userId}/${folderId}`
      : `user/${userId}`;

    const storagePath = await uploadFile(finalBuffer, storedName, folderPath);

    const file = await File.create({
      type: "file",
      user_id: userId,
      name: originalName,
      stored_name: storedName,
      storage_path: storagePath,
      parent_folder_id: folderId || null,
      mime_type: mimeType,
      size: size,
      storage_type: STORAGE_TYPE || "local",
    });

    return res.json({
      success: true,
      completed: true,
      file,
      message: "File uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ================================= GET USER FILES ==================================

const getUserFiles = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const folderId = req.query.folderId || null; // null indicates root folder

    const files = await File.findAll({
      where: {
        user_id: userId,
        parent_id: folderId,
      },
      order: [["updatedAt", "DESC"]],
    });

    if (!files) {
      return res.status(404).json({ message: "No files found" });
    }

    return res.json({
      files: files.map((file) => ({
        id: file.id,
        name: file.name,
        size: file.size,
        parent_id: file.parent_id,
        mime_type: file.mime_type,
      })),
      message: "Files retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const downloadFile = async (req, res) => {
  // how will we identify which file to download?
  // we can get file id from request params
  const fileId = req.params.fileId;
  const userId = req.user.id;

  try {
    const file = await File.findOne({
      where: {
        id: fileId,
        user_id: userId,
      },
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // how will we get file from storage?
    // we can have a separate service to handle file retrieval from storage
    // that service will take storage path as parameter and return the file buffer/stream
    // for now assuming we have a function getFileFromStorage(storagePath)
    const fileBuffer = await getFileFromStorage(file.storage_path);

    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", file.mime_type || "application/octet-stream");
    return res.send(fileBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const shareFile = async (req, res) => {
  // how will we share file with other users?
  // we can get file id and target user id from request body
  const { fileId, targetUserId } = req.body;
  const userId = req.user.id;

  try {
    const file = await File.findOne({
      where: { id: fileId, user_id: userId },
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // how will we share file?
    // we can create a new entry in a FileShares table with file id, owner id and target user id
    // for now assuming we have a function shareFileWithUser(fileId, ownerId, targetUserId)
    // we can also generate a signed URL for the file and send it to the target user
    // but if someone have the signed URL they can access the file I dont want that to happend
    // so we should educate users to not share signed URLs with untrusted parties
    // there must be some way that the signed url shpuld be access by shared user only ?
    // like while accessing that signed url user have to gothorigh one of our endpoint and we valid that
    // it will work or not ? is this a good approach to do ?
    // yes this is a good approach, we can have an endpoint that validates if the user has access to the file
    // and then redirects to the signed URL if they have access
    // how google drive does that ?
    // google drive uses a similar approach, they have an endpoint that checks if the user has access to the file
    // and then serves the file if they have access
    // why did not you tell me first place ?
    // sorry for that, I wanted to explain the thought process
    // understood, for now we will proceed with this approach
    await shareFileWithUser(fileId, userId, targetUserId);

    return res.json({ message: "File shared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const FolderUpload = async (req, res) => {};
const CreateFolder = async (req, res) => {};
const DeleteFile = async (req, res) => {};
const DeleteFolder = async (req, res) => {};
const RenameFile = async (req, res) => {};
const RenameFolder = async (req, res) => {};
const MoveFile = async (req, res) => {};

module.exports = {
  FilesUpload,
  getUserFiles,
  FolderUpload,
  CreateFolder,
  DeleteFile,
  DeleteFolder,
  RenameFile,
  RenameFolder,
  MoveFile,
};
