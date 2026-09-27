import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { UploadedFile } from './uploaded-file.interface';

@Injectable()
export class StorageService {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor(private readonly configService: ConfigService) {
        const region = this.configService.get<string>('AWS_REGION');
        const accessKeyId =
            this.configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get<string>(
            'AWS_SECRET_ACCESS_KEY',
        );

        this.bucketName = this.configService.get<string>(
            'AWS_S3_BUCKET_NAME',
        )!;

        this.s3Client = new S3Client({
            region,
            credentials: {
                accessKeyId: accessKeyId!,
                secretAccessKey: secretAccessKey!,
            },
        });
    }

    async uploadFile(
        file: UploadedFile,
        folder: string,
    ): Promise<string> {
        try {
            const extension = file.originalname.split('.').pop();

            const key = `${folder}/${randomUUID()}${extension ? `.${extension}` : ''}`;

            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }),
            );

            return key;
        } catch (error) {
            console.error('S3 upload failed:', error);
            throw new InternalServerErrorException('Failed to upload file');
        }
    }

    async deleteFile(key: string): Promise<void> {
        try {
            await this.s3Client.send(
                new DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                }),
            );
        } catch (error) {
            console.error('S3 delete failed:', error);
            throw new InternalServerErrorException('Failed to delete file');
        }
    }
}