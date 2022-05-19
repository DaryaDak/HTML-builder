const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if(err) return console.log(err);
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat((path.join(__dirname, 'secret-folder', file.name)), (err, stats) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size}b`);
        }
      });
    }
  });
});
