const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;

const stream = fs.createWriteStream(path.join(__dirname,"textfile.txt"),"UTF-8", () => {
    if(error) throw error;
    // console.log(data);
});
stream.write('Введите текст:\n');
stdout.write('Введите текст:\n');
stdin.on('data', data => {
    if (data === 'exit\n') { 
       return process.exit();
    } else {
        stream.write(data);
    }
});

process.on('SIGINT', () => {
    console.log('\nУдачного дня!');
process.exit();
});



