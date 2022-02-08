function fileHandler(req, bb) {
  return new Promise((resolve, reject) => {

    req.on('close', () => {
      console.log('REQUEST CLOSE');
    });
    req.on('error', (err) => {
      console.log('REQUEST ERROR\n', err);
    });
    req.on('end', () => {
      console.log('REQUEST END');
    });

    bb
      .on('file', onFile)
      .on('error', onError)
      .on('end', onEnd)
      .on('finish', onFinish)
      .on('close', onClose);

    bb.on('partsLimit', () => {
      const err = new Error('Reach parts limit');
      err.code = 'Request_parts_limit';
      err.status = 413;
      onError(err);
    });

    bb.on('filesLimit', () => {
      const err = new Error('Reach files limit');
      err.code = 'Request_files_limit';
      err.status = 413;
      onError(err);
    });

    bb.on('fieldsLimit', () => {
      const err = new Error('Reach fields limit');
      err.code = 'Request_fields_limit';
      err.status = 413;
      onError(err);
    });

    req.pipe(bb);

    function onFile(fieldname, filestream, info) {
      const { mimeType } = info;

      // 1
      if (mimeType !== 'image/png') {

        filestream.resume();

        const err = new Error('MIME type is not allowed');
        err.code = 'MIME_type_violation';
        err.status = 400;

        req.unpipe(bb); // comment this for a client response

        reject(err);
        return;
      }

      // 2 (uncomment below)
      // if (mimeType !== 'image/png') {

      //   // filestream.resume(); // uncomment this for a client response

      //   const err = new Error('MIME type is not allowed');
      //   err.code = 'MIME_type_violation';
      //   err.status = 400;

      //   // req.unpipe(bb);

      //   reject(err);
      //   return;
      // }

      // 3 (uncomment below)
      // if (mimeType !== 'image/png') {
      //   const err = new Error('MIME type is not allowed');
      //   err.code = 'MIME_type_violation';
      //   err.status = 400;

      //   filestream.destroy();

      //   reject(err);
      //   return;
      // }
    }

    function onError(err) {
      console.log('onError', err)
    }
    function onEnd() {
      console.log('onEnd');
    }
    function onFinish() {
      console.log('onFINISH');
    }
    function onClose() {
      console.log('onCLOSE');
    }
  });
}


export default fileHandler;
