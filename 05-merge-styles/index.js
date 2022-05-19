const fs = require('fs');
const path = require('path');

const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if(file.isFile()) {
      const fileName = file.name.split('.')[1];
      if (fileName == 'css') {
        const stream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
        stream.on('data', data => bundle.write(data.toString()));
      }
    }
  });
});