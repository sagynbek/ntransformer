import fs from "fs";
import Path from "path";
import { DEFAULT_DEPTH } from "../constants";


interface IConfig {
  // Provide absolute path, or will use __dirname
  path?: string,
  searchKey: string,
  replaceKey: string,
  maxDepth?: number,
}
/**
 * [Sync] Updates all key occurences of file names, 
 * under path recursively
 *
 * @export
 * @param {IConfig} config
 */
export function updateFileNames(config: IConfig) {
  const path = config.path || __dirname;
  recurse(path, config);
}


function recurse(path: string, config: IConfig, curDepth: number = 0) {
  const maxDepth = typeof (config.maxDepth) === "number" ? config.maxDepth : DEFAULT_DEPTH;

  if (curDepth > maxDepth) {
    return; // Max depth reached
  }

  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);

      // directory
      if (fs.lstatSync(curPath).isDirectory()) {
        recurse(curPath, config, curDepth + 1);
      }
      // file
      else {
        const fileInfo = Path.parse(curPath);
        if (fileInfo.name.includes(config.searchKey)) {
          const fileNewName = fileInfo.name.replace(new RegExp(config.searchKey, "g"), config.replaceKey); // RegExp used to catch all occurences
          const newFilePath = Path.join(fileInfo.dir, fileNewName + fileInfo.ext);
          
          fs.renameSync(curPath, newFilePath);
        }
      }
    })
  }
}