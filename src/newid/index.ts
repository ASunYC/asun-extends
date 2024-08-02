const uuid = require('uuid')

var shortArray = ["a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
    "W", "X", "Y", "Z"
]

/**
 * 生成新的唯一ID
 *
 * @returns 返回一个由62个字母和数字组成的字符串，作为新的唯一ID
 */
export function newID() {
    //不重复的选择：用 uuid.v1()
    //根据时间戳生成32位id，唯一。  v4是随机数生成，有几率相等。
    //这里不推荐用v1.  原因：试试就知道了。时间：年月日变化不大，后面都相等。
    var uid = uuid.v4();
    uid = uid.replace(/-/g, "");
    var buffer = [];
    //以32为基础，4*8，按顺序每次挑4位，对其进行16进制转换，以62个字母和数字为基础取余数，在数组里挑选相应字符。
    //分析结果：可能重复,但几率很小。
    for (var i = 0; i < 8; i++) {
        let start = i * 4;
        let end = i * 4 + 4;
        var str = uid.substring(start, end);
        buffer.push(shortArray[parseInt(str, 16) % 62]);
    }
    return buffer.join("");
}

//long
export function newIDv1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//short
export function newIDv2() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}