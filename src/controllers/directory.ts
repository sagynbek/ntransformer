import fs from "fs";
import Path from "path";
import { DEFAULT_DEPTH } from "../constants";


interface IConfig {
  /* Provide absolute path, or will use __dirname*/
  path?: string,
  searchKey: string | RegExp,
  replaceKey: string,
  maxDepth?: number,
}


/**
 * [Sync] Updates all key occurences of directory names, 
 * under path recursively
 *
 * @export
 * @param {IConfig} config
 */
export function updateDirectoryNames(config: IConfig) {
  const path = config.path || __dirname;
  recurse(path, config);
}

function recurse(path: string, config: IConfig, curDepth: number = 0) {
  const maxDepth = typeof (config.maxDepth) === "number" ? config.maxDepth : DEFAULT_DEPTH;
  if (curDepth > maxDepth) {
    return; // Max depth reached
  }

  if (fs.existsSync(path)) {

    fs.readdirSync(path).forEach((file) => {
      const curPath = Path.join(path, file);

      // directory
      if (fs.lstatSync(curPath).isDirectory()) {
        recurse(curPath, config, curDepth + 1);


        const folderInfo = Path.parse(curPath);
        const regex = (config.searchKey instanceof RegExp) ? config.searchKey : new RegExp(config.searchKey, "g");


        if (folderInfo.base.match(regex)) {
          const folderNewName = folderInfo.base.replace(regex, config.replaceKey); // RegExp used to catch all occurences
          const newFilePath = Path.join(folderInfo.dir, folderNewName);

          fs.renameSync(curPath, newFilePath);
        }
      }
    })
  }
}
