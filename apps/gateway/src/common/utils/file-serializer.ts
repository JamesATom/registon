import { BadRequestException } from '@nestjs/common';

export class FileSerializer {
    static async serializeMultipartData(data: any): Promise<any> {
        if (!data) {
            throw new BadRequestException('File is required');
        }

        if (!data) return null;

        const fields = {};
        if (data.fields) {
            Object.keys(data.fields).forEach(key => {
                fields[key] = data.fields[key].value;
            });
        }
        console.log('fielt', fields);

        let fileData = null;
        if (data) {
            const buffer = await data.toBuffer();
            fileData = {
                fieldname: data.fieldname,
                originalname: data.filename,
                encoding: data.encoding,
                mimetype: data.mimetype,
                size: buffer.length,
                buffer: buffer.toString('base64'),
            };
        }

        return {
            fields,
            file: fileData,
        };
    }
}
