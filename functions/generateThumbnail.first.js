/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.helloGCS = async (event, context) => {
  const storage = new Storage().bucket(event.bucket);
  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 3. 기존 파일을 읽어오기
      .pipe(sharp().resize({ width: 320 })) // 4. event 안의 file을 활용하여 썸네일 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 5. 생성된 썸네일을 재업로드
      .on('finish', () => resolve())
      .on('error', () => reject());
  });

  console.log('안녕하세요! 저는 트리거입니다!!');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);
  console.log(`Processing file: ${event.name}`);
};
