import http from 'node:http';
import initBusboy from './init_busboy.mjs';
import fileHandler from './fileHandler.mjs';


const server = http.createServer();

server.on('request', async (req, res) => {
  res.on('timeout', () => {
    console.log('res timeout');
  });
  res.on('error', (err) => {
    console.log('res error:', err);
  });

  if (req.method === 'POST') {
    console.log('POST request');

    const iBusboy = await initBusboy(req.headers);

    try {
      const file = await fileHandler(req, iBusboy);
    } catch (err) {
      console.error('rejected:', err);
      res.writeHead(500, { Connection: 'close', Location: '/' });
      res.end('err while handling file');
    }


  } else if (req.method === 'GET') {
    res.writeHead(200, { Connection: 'close' });
    res.end(`
      <body style="background-color: black">
        <form enctype="multipart/form-data" method="post">
          <label>file name
            <input type="text" name="textfield" />
          </label><br />
          <label>single file
            <input type="file" name="filefield" />
          </label><br />

          <br />
          <button type="submit">Upload</button>
        </form>
      </body>
    `);
  }
})

server.listen(3000, () => {
  console.info(`NodeJS process: ${process.pid}`)
  console.info(`Listening on port: 3000`)
});
