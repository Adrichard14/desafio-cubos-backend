import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CreateMovieDTO } from "../types/Movie";

export class AmazonService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });
  }

  async uploadImageToBucket(movie: CreateMovieDTO, file: string) {
    try {
      const fileName = `movies/${Date.now()}-${movie.title.replace(/\s+/g, '-')}.jpg`;
      const command = new PutObjectCommand({
        Bucket: "cubos-desafio-fullstack",
        Key: fileName,
        Body: file,
      });
      await this.s3Client.send(command);
      return `https://cubos-desafio-fullstack.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new Error('Falha ao fazer upload da imagem');
    }
  }
}