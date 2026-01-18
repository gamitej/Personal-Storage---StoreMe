const { z } = require("zod");

/* ===================== Auth ===================== */

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(1, "Name is required"),
});

/* ===================== File ===================== */

const uploadSchema = z.object({
  userId: z.string("Invalid User ID format"), 
  fileId: z.string("Invalid File ID format"),
  chunkIndex: z.preprocess((val) => Number(val), z.number().int().min(0)),
  totalChunks: z.preprocess((val) => Number(val), z.number().int().positive()),
  originalName: z.string()
    .min(1)
    .max(255)
    .refine((name) => !name.includes('..'), "Potential path traversal detected"),
  folderId: z.string().optional(),
  mimeType: z.string().includes("/"),
  size: z.preprocess((val) => Number(val), z.number().positive()),
});

module.exports = {  loginSchema, signupSchema, uploadSchema };