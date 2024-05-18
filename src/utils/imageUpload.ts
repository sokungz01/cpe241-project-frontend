import { SwalError } from "./swal";

export const validateUpload = async (file: File) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";
  if (!isJpgOrPng) {
    SwalError("Error!", "You can only upload JPG/PNG file!");
  }

  const isLessThan = file.size / 1024 / 1024 < 2;
  if (!isLessThan) {
    SwalError("Error", "Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLessThan;
};
