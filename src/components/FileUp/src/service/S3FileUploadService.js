import axios from 'axios';

class S3FileUploadService {
  /**
   * Generate a signed S3 upload url.
   * @param signedUrlEndpoint
   * @param file
   * @return {Promise}
   */
  static generateSignedUrl (signedUrlEndpoint, file) {
    return new Promise((resolve, reject) => {
      axios.post(signedUrlEndpoint, {
        name: file.name,
        type: file.type,
      }).then((response) => {
        resolve(response.data.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * Upload the file to S3.
   * @param signedUrlEndpoint
   * @param file
   * @return {Promise}
   */
  uploadFile (signedUrlEndpoint, file) {
    return new Promise((resolve, reject) => {
      let fileData;
      this.generateSignedUrl(signedUrlEndpoint, file).then((fileUploadData) => {
        fileData = fileUploadData;
        return axios.put(fileData.upload_url, file);
      }).then(() => {
        resolve(fileData.file_url);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

export default S3FileUploadService;
