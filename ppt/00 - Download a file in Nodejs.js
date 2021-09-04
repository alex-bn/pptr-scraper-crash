const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url').URL;

//downloadFile from an url

function downloadFile(url, filepath, callback) {
  const userURL = new URL(url);

  const requestCaller = userURL.protocol === 'http:' ? http : https;

  const filename = path.basename(url);

  const req = requestCaller.get(url, function (res) {
    const fileStream = fs.createWriteStream(path.resolve(filepath, filename));
    res.pipe(fileStream);

    fileStream.on('error', function (err) {
      console.log('Error writing to the stream.');
      console.log(err);
    });

    fileStream.on('close', function () {
      callback(filename);
    });

    fileStream.on('finish', function () {
      fileStream.close();
      // console.log('Done!');
    });
  });

  req.on('error', function (err) {
    console.log('Error downloading the file.');
    console.log(err);
  });
}

// downloadFile(
//   'https://images.pexels.com/photos/1569012/pexels-photo-1569012.jpeg',
//   function (fn) {
//     console.log(fn);
//   }
// );
// downloadFile(
//   'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg'
// );

module.exports.download = downloadFile;
