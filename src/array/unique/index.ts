// 数组去重
function unique<T>(arr: T[]): T[] {
    let seen = new Set<T>(); // Set 用来存储已经出现过的对象
    return arr.filter((item) => {
        // 使用 JSON.stringify(item) 作为对象的唯一标识
        let id = JSON.stringify(item);
        if (seen.has(item)) {
            return false;
        } else {
            seen.add(item);
            return true;
        }
    });
}

export { unique };