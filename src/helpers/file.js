import axios from 'axios';

export const getFileType = (mimeType) => {
  switch (mimeType) {
    case 'text/plain':
      return 'TXT';
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'DOCX';
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'PPTX';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'XLSX ';
    case 'application/vnd.rar':
      return 'RAR';
    case 'application/zip':
      return 'ZIP';
    case 'audio/mpeg':
    case 'audio/wav':
      return 'AUDIO';
    case 'video/mp4':
    case 'video/mpeg':
      return 'VIDEO';
    default:
      return 'IMAGE';
  }
};

export const uploadFiles = async (files) => {
  const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

  let formData = new FormData();
  formData.append('upload_preset', cloud_secret);

  let uploadedFiles = [];
  for (const fileItem of files) {
    const { file, type } = fileItem;
    formData.append('file', file);
    let response = await uploadToCloudinary(formData);
    uploadedFiles.push({
      file: response,
      type: type,
    });
  }
  return uploadedFiles;
};

const uploadToCloudinary = async (formData) => {
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;

  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
