import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_On_Cloudinary = async (localfilepath) => {
  try {
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localfilepath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    console.log(
      "Cloudinary.js :: Error Occured While File Uploading on Cloudinary",
      error,
    );
  }
};

const delete_from_Cloudinary = async (url) => {
  try {
    let public_id = JSON.stringify(url).split("/")[7].split(".")[0];
    const response = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,
    });
    if (response.result === "ok") {
      console.log("Image deleted successfully from Cloudinary");
    } else {
      console.error("Failed to delete image from Cloudinary:", response);
    }
  } catch (error) {
    console.error(
      "Error occurred while deleting image from Cloudinary:",
      error,
    );
  }
};

export { upload_On_Cloudinary,delete_from_Cloudinary };
