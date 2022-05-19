const fs = require('fs');
const path = require('path');

async function copyfiles() {
  await fs.promises.rm(path.join(__dirname,'files-copy'), { recursive: true, force: true});
  await fs.promises.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, (err) => {
    if(err) throw err;
  });
  await fs.readdir(path.join(__dirname,'files'), (err, files) => {
    if(err) throw err;
    files.forEach(file => {
      fs.copyFile((path.join(__dirname,'files', file)), (path.join(__dirname,'files-copy', file)), (err) => {
        if(err) throw err;
      });
    });
  });
}
copyfiles();