import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";

interface UploadedFiles {
  [fieldname: string]: Express.Multer.File[] | undefined;
}

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as UploadedFiles;

    if (!files || !files.coverImage || !files.coverImage[0]) {
      return res.status(400).json({ message: "No cover image uploaded" });
    }

    const coverImage = files.coverImage[0];
    const coverImageMimeType = coverImage.mimetype.split("/").pop() || "";
    const filename = coverImage.filename;
    const filePath = path.resolve(__dirname, "../../public/data/uploads", filename);

    // Move file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "book-covers",
      format: coverImageMimeType,
      timeout:6000,
    });

    // Respond with success message
    res.status(200).json({ message: "Upload successful", data: uploadResult });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
};

export { createBook };
