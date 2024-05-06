import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import * as firebaseKey from '../../../firebase-key.json'
import * as admin from "firebase-admin";
import { UserModule } from 'src/feature/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [UploadController],
    providers: [UploadService,
        {
        provide: 'FirebaseAdmin',
        useFactory: () => {
          admin.initializeApp({
            credential: admin.credential.cert(
              firebaseKey as admin.ServiceAccount,
            ),
          });
          return admin;
        },
      },],
    exports: [UploadService, 'FirebaseAdmin'],
})
export class UploadModule { }
