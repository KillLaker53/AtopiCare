import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucketName: string | undefined;

    constructor() {
        this.s3 = new S3Client([{
            region: `${process.env.AWS_REGION}`,
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
            },
        }]);
        this.bucketName = `${process.env.AWS_S3_BUCKET_NAME}`;
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileKey = `${uuidv4()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3.send(command);
        return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }
}

