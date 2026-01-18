const fs = require("fs").promises;
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const STORAGE_TYPE = process.env.STORAGE_TYPE || "local";

let s3;
if (STORAGE_TYPE === "cloud" && process.env.CLOUD_PROVIDER === "s3") {
  s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Upload file (LOCAL or S3)
 */
async function uploadFile(fileBuffer, filename, folder = "") {
  if (STORAGE_TYPE === "cloud") {
    const key = folder ? `${folder}/${filename}` : filename;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: "application/octet-stream",
      })
    );

    return `s3://${process.env.AWS_BUCKET_NAME}/${key}`;
  }

  // LOCAL STORAGE
  const uploadPath = path.join(process.env.UPLOADS_PATH || "./uploads", folder);

  await fs.mkdir(uploadPath, { recursive: true });

  const filePath = path.join(uploadPath, filename);
  await fs.writeFile(filePath, fileBuffer);
  
  return filePath;
}

module.exports = { uploadFile };
