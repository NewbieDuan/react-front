export interface File {
    id: number,
    name: string,
    size: number,
    type: string,
    createTime: number,
    tags: Array<string>//string[]
}

export interface UploadData {
    name: string;
    desc: string;
    file: File
}