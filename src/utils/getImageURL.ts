import { storage } from "../../appwrite";

const getImageURL = async (image: Image) => {
  const url = storage.getFilePreview(image.buckedId, image.fileId);
  return url;
};

export default getImageURL;
