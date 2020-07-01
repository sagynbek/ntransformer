# ntransformer

This package can help you to change substrings of directory names, file names and file content. 
Also it does it recursively, so you can change all occurences under certain directory.

Written purely using TypeScript, so it's strongly typed

All function have config parameter `maxDepth` which control depth of recursion


> Run `npm i ntransformer` to install package

___

### Changing file names:
Changes `searchKey` with `replaceKey` in file names under `path` recursively

> Example use of **updateFileNames**

```javascript
const ntransformer = require("ntransformer");

ntransformer.updateFileNames({ 
  searchKey: 'searchkey',
  replaceKey: 'replaceKey',
  path: path.join(__dirname, "target-folder")
})
```

| Config                      | Values                                            | Required    | Description                           | 
| -------------               | ----------------------                            | :---------: | ----------------------                | 
| path                        | string (Default = **__dirname**)                  | No          | absolute path                         |
| searchKey                   | string|RegExp (case sensitive)                    | Yes         | search key substring                  |
| replaceKey                  | string                                            | Yes         | replace key                           |
| maxDepth                    | number (Default = **10**)                         | No          | maximum recursion depth               |


![Application image](./images/file-name-demo.gif?raw=true)

___

### Changing directory names:

Changes `searchKey` with `replaceKey` in directory names under `path` recursively

> Example use of **updateDirectoryNames**

```javascript
const ntransformer = require("ntransformer");

ntransformer.updateDirectoryNames({ 
  searchKey: 'searchkey',
  replaceKey: 'replaceKey',
  path: path.join(__dirname, "target-folder")
})
```

| Config                      | Values                                            | Required    | Description                           | 
| -------------               | ----------------------                            | :---------: | ----------------------                | 
| path                        | string (Default = **__dirname**)                  | No          | absolute path                         |
| searchKey                   | string|RegExp (case sensitive)                    | Yes         | search key substring                  |
| replaceKey                  | string                                            | Yes         | replace key                           |
| maxDepth                    | number (Default = **10**)                         | No          | maximum recursion depth               |

![Application image](./images/directory-name-demo.gif?raw=true)

___

### Replacing file contents:

Replaces `searchKey` with `replaceKey` in all allowed (by extensions) files under `path` recursively

> Example use of **updateFileContent**

```javascript
const ntransformer = require("ntransformer");

ntransformer.updateFileContent({ 
  searchKey: 'searchkey',
  replaceKey: 'replaceKey',
  path: path.join(__dirname, "target-folder"),
  permittedFileExtensions: [".txt", ".js", ".ts", ".json"]
})
```

| Config                      | Values                                                              | Required    | Description                           | 
| -------------               | ----------------------                                              | :---------: | ----------------------                | 
| path                        | string (Default = **__dirname**)                                    | No          | absolute path                         |
| searchKey                   | string|RegExp (case sensitive)                                      | Yes         | search key substring                  |
| replaceKey                  | string                                                              | Yes         | replace key                           |
| maxDepth                    | number (Default = **10**)                                           | No          | maximum recursion depth               |
| permittedFileExtensions     | Array of string (Default = **[".txt", ".js", ".ts", ".json"]**)     | No          | maximum recursion depth               |