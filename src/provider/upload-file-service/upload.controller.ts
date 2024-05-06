import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { GetCurrentUserId } from 'util/decorator/get-current-user-id.decorator';

@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @GetCurrentUserId() userId: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        const result = await this.uploadService.uploadAvatar(file, userId);
        return result;
    }
}
