import fs from 'fs';
import fileSave from 'file-save';
import path from 'path';
import { kebabCase } from 'lodash';

const componentListPaths = {
  'core': '../../core/data/components.json',
  'react': '../../react/src/app/ComponentList.js',
  'angular': '../../angular/src/lib/public_api.ts',
  'vue': '../../vue/components.json'
};

const jsonDirectory = path.resolve(__dirname, '../client/data');

const save = (filePath, fileName, data) => {
  fileSave(path.join(filePath, fileName))
    .write(data, 'utf8')
    .end('\n');
  // eslint-disable-next-line no-console
  console.log(`Component list saved to ${filePath}/${fileName}`);
};

const getReactComponentList = str => {
  let res = str.match(/'(.+?)'/g);
  return res.map(function(item){
    return kebabCase(item.replace(/'/g, ''));
  });
};

const getAngularComponentList = str => {
  let res = str.match(/'\.\/(.+?)\//g);
  return res.map(function(item){
    return item.replace(/'\.\/|\//g, '');
  });
};

const getComponentList = (fileName) => {
  let filePath = path.resolve(__dirname, componentListPaths[fileName]);
  if (filePath) {
    const result = fs.readFileSync(filePath, 'utf-8');
    let listStr = result;
    if (fileName === 'core') {
      const lst = JSON.parse(result);
      let names = [];
      lst.map(function(item){
        names.push(item.name);
      });
      listStr = JSON.stringify(names);
    } else if (fileName === 'react') {
      const res = getReactComponentList(result);
      listStr = JSON.stringify(res);
    } else if (fileName === 'angular') {
      const res = getAngularComponentList(result);
      listStr = JSON.stringify(res);
    } else if (fileName === 'vue') {
      const lst = JSON.parse(result);
      let names = Object.keys(lst);
      listStr = JSON.stringify(names);
    }

    save(jsonDirectory, 'component-list-' + fileName + '.json', listStr);
  }
};

try {
  for(let name in componentListPaths){
    getComponentList(name);
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}