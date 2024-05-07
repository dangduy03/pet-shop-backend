import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Types } from 'mongoose';
import * as Randomstring from 'randomstring';
import UserRepository from 'src/feature/user/user.repository';

@Injectable()
export class UploadService {
    constructor(
        @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App,
        private readonly userRepository: UserRepository,
    ) { }

    async uploadAvatar(file: Express.Multer.File, userId: string) {
        const bucket = this.firebaseAdmin
            .storage()
            .bucket('gs://pet-shop-d68c0.appspot.com');
        const extenstion = file.originalname.split('.').pop();
        file.originalname = `${Randomstring.generate(10)}.${extenstion}`;

        const blob = bucket.file(`${file.originalname}`);
        // check if file exists
        const [exists] = await blob.exists();
        if (exists) {
            await blob.delete();
        }
        const stream = blob.createWriteStream({
            metadata: {
                contentLength: file.size, // Kích thước tệp
                contentType: file.mimetype, // Định dạng tệp
            },
        });

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                // Tải lên hoàn tất
                blob.makePublic().then(async () => {
                    // cập nhật avatar cho user
                    const user = await this.userRepository.updateOneById(new Types.ObjectId(userId), {
                        avatar: blob.publicUrl(),
                    });
                    resolve(user);
                });
            });

            stream.on('error', (error) => {
                // Xảy ra lỗi trong quá trình tải lên
                reject(error);
            });

            stream.end(file.buffer);
        });
    }

    async uploadImage(file: Express.Multer.File){
        const bucket = this.firebaseAdmin
            .storage()
            .bucket('gs://pet-shop-d68c0.appspot.com');
        const extenstion = file.originalname.split('.').pop();
        file.originalname = `${Randomstring.generate(10)}.${extenstion}`;

        const blob = bucket.file(`${file.originalname}`);
        // check if file exists
        const [exists] = await blob.exists();
        if (exists) {
            await blob.delete();
        }
        const stream = blob.createWriteStream({
            metadata: {
                contentLength: file.size, // Kích thước tệp
                contentType: file.mimetype, // Định dạng tệp
            },
        });

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                // Tải lên hoàn tất
                blob.makePublic().then(async () => {
                    resolve(blob.publicUrl());
                });
            });

            stream.on('error', (error) => {
                // Xảy ra lỗi trong quá trình tải lên
                reject(error);
            });

            stream.end(file.buffer);
        });
    }
}
