import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';
const storage = multer.memoryStorage();
export const upload = multer({ storage });
const API_KEYS = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_KEY_SECRET;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEYS,
    api_secret: API_SECRET,
});
export const uploadToCloudinary = async (file, resourceType) => {
    const fileStream = streamifier.createReadStream(file.buffer);
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: resourceType === 'audio' ? 'raw' : resourceType }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                const secureUrl = result?.secure_url;
                if (secureUrl) {
                    resolve(secureUrl);
                }
                else {
                    reject(new Error('Error uploading file to Cloudinary'));
                }
            }
        });
        fileStream.pipe(uploadStream);
    });
};
//# sourceMappingURL=storage.js.map