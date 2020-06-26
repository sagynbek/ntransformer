import fs from "fs";
import Path from "path";
import { DEFAULT_DEPTH } from "./constants";

const PERMITTED_FILE_EXTENSIONS = [".txt", ".js", ".ts", ".json", ""];

interface IConfig {
  // Provide absolute path, or will use __dirname
  path?: string,
  searchKey: string,
  replaceKey: string,
  maxDepth?: number,
  permittedFileExtensions?: Array<string>,
}
/**
 * [Sync] Updates all key occurences of file names, 
 * under path recursively
 *
 * @export
 * @param {IConfig} config
 */
export function updateFileContent(config: IConfig) {
  const path = config.path || __dirname;
  recurse(path, config);
}


function recurse(path: string, config: IConfig, curDepth: number = 0) {
  const maxDepth = typeof (config.maxDepth) === "number" ? config.maxDepth : DEFAULT_DEPTH;
  const permittedFileExtensions = config.permittedFileExtensions || PERMITTED_FILE_EXTENSIONS;

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
        if (permittedFileExtensions.includes(fileInfo.ext)) {
          const fileContent = fs.readFileSync(curPath, { encoding: "utf-8" });
          if (fileContent.includes(config.searchKey)) {
            const updatedFileContent = fileContent.replace(new RegExp(config.searchKey, "g"), config.replaceKey);
            fs.writeFileSync(curPath, updatedFileContent, { encoding: "utf-8" });
          }
        }
      }
    })
  }
}