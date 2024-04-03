import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (localFilepath, CloudinaryfolderName) => {
  try {
    if (!localFilepath) return "could not find the file";
    const resp = await cloudinary.uploader.upload(
        localFilepath, {
      folder: CloudinaryfolderName,
      resource_type: "video",
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
        { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],
        eager_async: true, 
    });
    fs.unlinkSync(localFilepath);
    console.log("Uploaded to Cloudinary", resp.public_id);
    return resp;
  } catch (error) {
    if (error) {
      fs.unlinkSync(localFilepath); // delete local copy of image after locally saved temporary file as the upload operation got failed
    }
    return error;
  }
};

export { uploadVideo };
