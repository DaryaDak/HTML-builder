const fs = require('fs');
const path = require('path');


createPage();
async function createPage(){
  await fs.promises.mkdir(path.join(__dirname,'project-dist'), { recursive: true }, (err) => {
    if(err) throw err;
  });
  const templateData = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'UTF-8');
  await fs.promises.writeFile((path.join(__dirname, 'project-dist', 'index.html')), templateData);
  const htmlFile =  await fs.promises.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'UTF-8');
  const tags = htmlFile.match(/{{[a-z]*}}/gi);

  // change tags
  for (let tag of tags) {
    const tagName = tag.slice(2,-2); 
    const fileInfo = await fs.promises.readFile(path.join(__dirname, 'components', `${tagName}.html`), 'UTF-8');
    const exHtmlFile = await fs.promises.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'UTF-8');
    const newHtmlFile = exHtmlFile.replace(tag, fileInfo);
    await fs.promises.writeFile((path.join(__dirname, 'project-dist', 'index.html')), newHtmlFile);
  }

  //add styles
  const style = await fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const stream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      if (file.name.includes('.css')) {
        stream.on('data', data => style.write(data.toString()));
      }
    });
  });

  //add assets 
  await fs.promises.rm(path.join(__dirname,'project-dist', 'assets'), { recursive: true, force: true});
  await fs.promises.mkdir(path.join(__dirname,'project-dist', 'assets'), { recursive: true }, (err) => {
    if(err) throw err;
  });
  const assetsFolders = await fs.promises.readdir(path.join(__dirname,'assets'));
  for(let item of assetsFolders){
    await fs.promises.rm(path.join(__dirname,'project-dist', 'assets', item), { recursive: true, force: true});
    await fs.promises.mkdir(path.join(__dirname,'project-dist', 'assets', item), { recursive: true }, (err) => {
      if(err) throw err;
    });
    const files = await fs.promises.readdir(path.join(__dirname, 'assets', item));
    files.forEach(file => {
      fs.copyFile(path.join(__dirname,'assets', item, file), (path.join(__dirname,'project-dist', 'assets', item, file)), (err) => {
        if(err) throw err;
      });
    });
  }
}
