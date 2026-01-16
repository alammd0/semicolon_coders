import cloudinary from "@/config/cloudinary";

export const uploadToCloudinary = async (fileUri : string, fileName : string) => {
    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            invalidate : true,
            resource_type : "auto",
            filename_override : fileName,
            folder : "semicolon_coders",
            use_filename : true,
        });
        return { success: true, result };
    }
    catch(error){
        return {
            success : false,
            error : error,
        }
    }
}