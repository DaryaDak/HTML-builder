const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;

const stream = fs.createWriteStream(path.join(__dirname,'textfile.txt'),'UTF-8', () => {
  // eslint-disable-next-line no-undef
  if(error) throw error;
});
stream.write('Enter text:\n');
stdout.write('Enter text:\n');
stdin.on('data', data => {
  if (data.includes('exit')) {
    console.log('Good luck!');
    process.exit();
  } else {
    stream.write(data);
  }
});

process.on('SIGINT', () => {
  console.log('\nBye! Have a good day!');
  process.exit();
});