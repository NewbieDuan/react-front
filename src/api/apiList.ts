
interface ApiList {
    [propName: string]: string//字符串索引签名
}

// Record<string,string>代替ApiList
const apiList: ApiList = {
    login: '/base/login',
    getFileList: '/home/getFileList',
    getFileTypeList: '/home/getFileTypeList',
    deleteFile: '/home/deleteFile',
    upload: 'file/upload',
    download: 'file/download'
}
export default apiList