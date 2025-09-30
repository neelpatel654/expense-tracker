import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  //Append Image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //set header for file upload
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Error uploading image", e);
    throw e; // Rethrow error for handling
  }
};

export default uploadImage;
