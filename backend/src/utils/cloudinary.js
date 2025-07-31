import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
//   });
cloudinary.config({ 
    cloud_name: 'dvcfuwk8i', 
    api_key: '831744172249142', 
    api_secret: "70Cqqdc-l5Sd_P6anV4s0f0n0Rg" 
  });


  const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // console.log('file has been uploaded on cloudinary' , response.url )
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
  }


  export {uploadOnCloudinary}