// item.ts
export interface Item {
    id: number;
    pid: number;
    children: Item[]; // 添加 children 属性
}

export const arrayToTree = (items: Item[]): Item[] => {
    const result: Item[] = [];
    const itemMap: { [key: number]: Item } = {};

    for (const item of items) {
        const { id, pid } = item;

        if (!itemMap[id]) {
            itemMap[id] = {
                ...item,
                children: [], // 初始化 children 属性
            };
        }

        const treeItem = itemMap[id];

        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    id: pid, // Assuming pid exists in items
                    pid: 0,  // Assuming root node has pid 0
                    children: [],
                } as Item; // 类型断言为 Item 类型
            }
            itemMap[pid].children.push(treeItem);
        }
    }

    return result;
};
