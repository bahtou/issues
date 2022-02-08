import BusBoy from 'busboy';


async function initBusboy(headers) {
  console.log('\ninitializing busboy');
  return new Promise((resolve,  reject) => {
    let bb;
    const maxFiles = 20;
    const maxFileSize = 10_496_000;
    const maxTotalFileSize = 209_715_200;
    const maxFields = 1000;
    const maxFieldsSize = 20_971_520;
    const minFileSize = 76_80;
    const options = {
      headers,
      defCharset: 'utf8',
      limits: {
        fieldNameSize: 100,
        fieldSize: maxFieldsSize,
        fields: maxFields,
        fileSize: maxFileSize,
        files: maxFiles,
        parts: maxTotalFileSize,
        headerPairs: 2000
      }
    };

    try {
      bb = BusBoy(options);
    } catch (err) {
      return reject(err);
    }

    return resolve(bb);
  });
}


export default initBusboy;
