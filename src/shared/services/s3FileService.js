const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class S3FileService {
  constructor(s3Instance) {
    this.s3Client = s3Instance;
  }

  async getFile(file) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: file.getID().toString(),
      ResponseContentDisposition: `attachment; filename="${file.getOriginalFileName()}"`,
    });

    try {
      const presignedUrl = await getSignedUrl(this.s3Client, getObjectCommand, {
        expiresIn: 60 * 60,
      });
      // console.log(presignedUrl);
      return presignedUrl;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error: File cannot be retrieved');
    }
  }

  async addFile(file, buffer) {
    const putObjectCommand = new PutObjectCommand({
      Body: buffer,
      Bucket: process.env.BUCKET_NAME,
      Key: file.getID().toString(),
    });

    try {
      await this.s3Client.send(putObjectCommand);
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error: File cannot be added');
    }
  }
  async deleteFile(file) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: file.getSignedUrl().toString(),
    });
    try {
      const result = await this.s3Client.send(deleteObjectCommand);
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error: File cannot be deleted');
    }
  }
}

module.exports = S3FileService;
