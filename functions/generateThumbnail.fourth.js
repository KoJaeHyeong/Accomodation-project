/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.helloGCS = async (event, context) => {
  // 2. 이미 썸네일이 있는 경우
  if (event.name.includes('thumb/')) return;

  const storage = new Storage().bucket(event.bucket);

  await Promise.all(
    [
      { size: 360, folder: 'thumb/s' },
      { size: 640, folder: 'thumb/m' },
      { size: 1280, folder: 'thumb/l' },
    ].map((el) => {
      return new Promise((resolve, reject) => {
        storage
          .file(event.name)
          .createReadStream()
          .pipe(sharp().resize({ width: el.size }))
          .pipe(storage.file(`${el.folder}/${event.name}`).createWriteStream())
          .on('finish', () => resolve())
          .on('error', () => reject());
      });
    }),
  );
  console.log('안녕하세요! 저는 트리거입니다!!');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);
  console.log(`Processing file: ${event.name}`);
};
