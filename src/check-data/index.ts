/**
 * 通用检测类
 */
export class Check {
    static defaultValue<T>(a: T | undefined | null, b: T): T {
        if (a !== undefined && a !== null) {
            return a;
        }
        return b;
    }

    /**
     * 检查参数是否为普通对象
     * @param obj
     * @return {boolean}
     */
    static isObject(obj: any): obj is Record<string, any> {
        return typeof obj === 'object' && obj !== null;
    }

    /**
     * 检查参数是否为布尔值
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isBoolean(value: any): value is boolean {
        return typeof value === 'boolean';
    }

    /**
     * 检查参数是否为json对象
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isJson(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    /**
     * 判定是否为字符串
     * @param value 被检测对象 
     * @return 返回值true or false
     */
    static isString(value: any): value is string {
        return typeof value === 'string' && value.constructor === String;
    }

    /**
     * 判定是否为数值
     * @param value 被检测对象 
     * @return 返回值true or false
     */
    static isNumber(value: any): value is number {
        return typeof value === 'number' && value.constructor === Number;
    }

    /**
     * 判定参数是否为数组
     * @param value 被检测对象 
     * @return 返回值true or false
     */
    static isArray(value: any): value is any[] {
        return Array.isArray(value);
    }

    /**
     * 判断字符串是否为十六进制颜色。例如#FFFFFFFF或者#FFFFFF  
     * @param value
     * @return 返回值true or false
     */
    static isColor(value: string): boolean {
        const regColor = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
        return regColor.test(value);
    }

    /**
     * 判断字符串是否为十六进制颜色。
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isCssColor(value: string): boolean {
        const regColor = /^(rgba|rgb|#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}))$/;
        return regColor.test(value);
    }

    /**
     * 判断颜色是否有效
     * @param value 
     * @return 返回值 "valid" 或 "invalid"
     */
    static CheckIsColor(value: string): string {
        if (!value || value.length === 0) {
            return "invalid";
        }
        let type = '';
        if (/^rgb\(/.test(value)) {
            type = "^[rR][gG][Bb][\\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\\)]{1}$";
        } else if (/^rgba\(/.test(value)) {
            type = "^[rR][gG][Bb][Aa][\\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[\\)]{1}$";
        } else if (/^#/.test(value)) {
            type = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$";
        } else if (/^hsl\(/.test(value)) {
            type = "^[hH][Ss][Ll][\\(]([\\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*[\\)]$";
        } else if (/^hsla\(/.test(value)) {
            type = "^[hH][Ss][Ll][Aa][\\(]([\\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*[\\)]$";
        }
        let re = new RegExp(type);
        return re.test(value) ? "valid" : "invalid";
    }

    /**
     * 检测正数类型
     * @param value 需检测数值
     * @param defaultValue 默认值 
     * @param min 最小值
     * @param max 最大值
     * @return 返回值
     */
    static checkNumber(value: any, defaultValue: number, min?: number, max?: number): number {
        if (value === undefined || value === null) return defaultValue;
        if (defaultValue === value) return defaultValue;

        if (this.isString(value)) {
            value = parseFloat(value);
        }

        if (this.isNumber(value)) {
            if (min !== undefined && value < min) {
                console.warn(`参数小于最小范围 ${min}。 当前参数${value}; 使用最小值: ${min}`);
                return min;
            }
            if (max !== undefined && value > max) {
                console.warn(`参数大于最大范围 ${max}。 当前参数${value}; 使用最小值: ${max}`);
                return max;
            }
            return value;
        }
        console.warn(`参数应为数值类型。当前参数:${value}; 使用默认参数:${defaultValue};`);
        return defaultValue;
    }

    /**
     * 检测正数类型
     * @param value 需检测数值
     * @param defaultValue 默认值 
     * @param min 最小值
     * @param max 最大值
     * @return 返回值
     */
    static checkInt(value: any, defaultValue: number, min?: number, max?: number): number {
        if (value === undefined || value === null) return defaultValue;
        if (defaultValue === value) return defaultValue;

        value = Math.floor(value);

        if (min !== undefined && value < min) {
            console.warn(`参数小于最小范围 ${min}。 当前参数${value}; 使用最小值: ${min}`);
            return min;
        }
        if (max !== undefined && value > max) {
            console.warn(`参数大于最大范围 ${max}。 当前参数${value}; 使用最小值: ${max}`);
            return max;
        }
        return value;
    }

    /**
     * 检测枚举值
     * @param value 需检测参数 
     * @param defaultValue 默认值
     * @param enums 枚举列表
     * @return 返回值
     */
    static checkEnum<T>(value: T | undefined | null, defaultValue: T, enums: T[]): T {
        if (value === undefined || value === null) return defaultValue;
        if (defaultValue === value) return defaultValue;

        for (const enumItem of enums) {
            if (value === enumItem) return value;
        }

        const enumsStr = enums.join('、');
        console.warn(`无该枚举类型。当前参数: ${value}; 支持的参数:${enumsStr}; 使用默认参数:${defaultValue}`);
        return defaultValue;
    }

    /**
     * 设置颜色(待完善)
     * @param value 需检测参数
     * @param defaultValue  默认参数
     * @return 返回值
     */
    static checkColor(value: string, defaultValue: string): string {
        const isRgb = value.match(/^(rgba)/g);
        const isCss = value.match(/^(#)/g);
        if (!this.isString(value)) return defaultValue;
        if (isRgb) return value;
        if (isCss && (value.length === 4 || value.length === 7)) return value;
        return defaultValue;
    }

    /**
     * 检查传入的值是否为字符串类型，如果是则返回该值，否则返回默认值。
     *
     * @param value 待检查的值
     * @param defaultValue 默认值
     * @returns 字符串类型的值或默认值
     */
    static checkString(value: any, defaultValue: string): string {
        if (!this.isString(value)) return defaultValue;
        return value;
    }

    /**
     * 判断给定值是否为空
     *
     * @param value 待判断的值
     * @returns 如果为空则返回true，否则返回false
     */
    static isEmpty(value: any): boolean {
        if (value === "") return true; //检验空字符串
        if (value === "null") return true; //检验字符串类型的null
        if (value === "undefined") return true; //检验字符串类型的 undefined
        if (!value && value !== 0 && value !== "") return true; //检验 undefined 和 null
        if (Array.prototype.isPrototypeOf(value) && value.length === 0) return true; //检验空数组
        if (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0) return true; //检验空对象
        return false;
    }
}
