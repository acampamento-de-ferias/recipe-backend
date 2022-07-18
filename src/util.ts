import v8 from 'v8';
import fs from 'fs';

export const deepCloneNative = (obj: any): any => v8.deserialize(v8.serialize(obj));

export const removeFile = (path: string): void => {
  const absolutePath = `${__dirname} ${path}`;
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};
