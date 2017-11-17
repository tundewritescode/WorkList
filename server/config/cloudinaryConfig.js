import cloudinary from 'cloudinary';

/**
 * Cloudinaray configuration
 */
export default cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
