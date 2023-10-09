import { ID, storage } from "../../appwrite";

const uploadImage = async (image: File | null) => {
  if (!image) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_IMG_STORAGE_ID!,
    ID.unique(),
    image
  );

  return fileUploaded;
};

export default uploadImage;
