import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IUpload {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IUpload) {
    const storage = new Storage({
      // 저장할 스토리지 설정
      keyFilename: '/my-secret/gcp-key.json', // GCP secret key 등록
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const waitedFiled = await Promise.all(files);

    const results = await Promise.all(
      waitedFiled.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream().pipe(
            storage
              .file(el.filename)
              .createWriteStream()
              .on(
                'finish',
                () => resolve(`${process.env.STORAGE_BUCKET}/${el.filename}`), // 트리거 하위폴더 thumb에 저장 하기
              )
              .on('error', (error) => reject(error)),
          );
        });
      }),
    );

    return results;
  }
}
