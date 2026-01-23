// 用正则匹配驼峰命名法转化为el-button字符拼接法
export const toElLine = (str: string): string => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}