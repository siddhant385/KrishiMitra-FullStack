// api/image.js

/**
 * Uploads image to backend for detection
 * @param {File | Blob} file - Image file or captured blob
 */
import { createClient } from "@/utils/apiClient";

export const detectImage = async (file, token) => {
  const client = createClient(token);
  const formData = new FormData();
  formData.append("file", file);

  const res = await client.post("/image/detect", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


/**
 * Fetches recent scan history for a user
 * @param {string} userId
 */
export const getHistory = async (userId,token) => {
  const client = createClient(token);
  const res = await client.get("/image/image-history", {
    params: { user_id: userId },
  });
  return res.data;
};
