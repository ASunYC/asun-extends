const flat = <T>(arr: T[]): T[] => {
    return arr.reduce((pre: T[], cur: T) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : [cur]);
    }, []);
};

export { flat };