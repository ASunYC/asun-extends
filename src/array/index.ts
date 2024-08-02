function arrScrambling<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
        const randomIndex = Math.floor(Math.random() * (arr.length - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

export { arrScrambling };

// 数组去重
export { unique } from "./unique";
// 数组扁平化（降维）
export { flat } from "./flat";
// 数组扁平化（降维）
export { Item, arrayToTree } from "./arrayToTree";