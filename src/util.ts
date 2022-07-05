import v8 from "v8";

export const deepCloneNative = (obj: any): any => {
    return v8.deserialize(v8.serialize(obj));
}