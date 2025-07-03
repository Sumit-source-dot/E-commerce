import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'payment-proofs',
      resource_type: 'image'
    });
    
    // Delete file from server after upload
    fs.unlinkSync(file.path);
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};