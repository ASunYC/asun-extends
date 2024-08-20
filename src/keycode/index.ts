type KeyCodeInput = number | string | KeyboardEvent | undefined;

interface KeyMap {
    [key: string]: number;
}

interface ReverseKeyMap {
    [key: number]: string;
}

// Key code map
const codes: KeyMap = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'pause/break': 19,
    'caps lock': 20,
    'esc': 27,
    'space': 32,
    'page up': 33,
    'page down': 34,
    'end': 35,
    'home': 36,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'insert': 45,
    'delete': 46,
    'command': 91,
    'left command': 91,
    'right command': 93,
    'numpad *': 106,
    'numpad +': 107,
    'numpad -': 109,
    'numpad .': 110,
    'numpad /': 111,
    'num lock': 144,
    'scroll lock': 145,
    'my computer': 182,
    'my calculator': 183,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    "'": 222
};

const aliases: KeyMap = {
    'windows': 91,
    '⇧': 16,
    '⌥': 18,
    '⌃': 17,
    '⌘': 91,
    'ctl': 17,
    'control': 17,
    'option': 18,
    'pause': 19,
    'break': 19,
    'caps': 20,
    'return': 13,
    'escape': 27,
    'spc': 32,
    'spacebar': 32,
    'pgup': 33,
    'pgdn': 34,
    'ins': 45,
    'del': 46,
    'cmd': 91
};

// Populate lower case chars, numbers, function keys, and numpad keys
for (let i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32;
for (let i = 48; i < 58; i++) codes[i - 48] = i;
for (let i = 1; i < 13; i++) codes[`f${i}`] = i + 111;
for (let i = 0; i < 10; i++) codes[`numpad ${i}`] = i + 96;

const names: ReverseKeyMap = {};
for (const key in codes) {
    if (Object.prototype.hasOwnProperty.call(codes, key)) {
        names[codes[key]] = key;
    }
}

for (const alias in aliases) {
    if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
        codes[alias] = aliases[alias];
    }
}

export function keyCode(searchInput: KeyCodeInput): number | string | undefined {
    if (searchInput && typeof searchInput === 'object') {
        const hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
        if (hasKeyCode) searchInput = hasKeyCode;
    }

    if (typeof searchInput === 'number') return names[searchInput];
    const search = String(searchInput).toLowerCase();

    const foundNamedKey = codes[search] || aliases[search];
    if (foundNamedKey) return foundNamedKey;

    if (search.length === 1) return search.charCodeAt(0);

    return undefined;
}

keyCode.isEventKey = function isEventKey(event: KeyboardEvent, nameOrCode: KeyCodeInput): boolean {
    if (event && typeof event === 'object') {
        const keyCode = event.which || event.keyCode || event.charCode;
        if (keyCode === null || keyCode === undefined) return false;

        if (typeof nameOrCode === 'string') {
            const foundNamedKey = codes[nameOrCode.toLowerCase()] || aliases[nameOrCode.toLowerCase()];
            return foundNamedKey === keyCode;
        } else if (typeof nameOrCode === 'number') {
            return nameOrCode === keyCode;
        }
    }
    return false;
};

export { codes, aliases }

export declare interface CodesMap {
    'backspace': number;
    'tab': number;
    'enter': number;
    'shift': number;
    'ctrl': number;
    'alt': number;
    'pause/break': number;
    'caps lock': number;
    'esc': number;
    'space': number;
    'page up': number;
    'page down': number;
    'end': number;
    'home': number;
    'left': number;
    'up': number;
    'right': number;
    'down': number;
    'insert': number;
    'delete': number;
    'command': number;
    'left command': number;
    'right command': number;
    'numpad *': number;
    'numpad +': number;
    'numpad -': number;
    'numpad .': number;
    'numpad /': number;
    'num lock': number;
    'scroll lock': number;
    'my computer': number;
    'my calculator': number;
    ';': number;
    '=': number;
    ',': number;
    '-': number;
    '.': number;
    '/': number;
    '`': number;
    '[': number;
    '\\': number;
    ']': number;
    "'": number;
    'a': number;
    'b': number;
    'c': number;
    'd': number;
    'e': number;
    'f': number;
    'g': number;
    'h': number;
    'i': number;
    'j': number;
    'k': number;
    'l': number;
    'm': number;
    'n': number;
    'o': number;
    'p': number;
    'q': number;
    'r': number;
    's': number;
    't': number;
    'u': number;
    'v': number;
    'w': number;
    'x': number;
    'y': number;
    'z': number;
    '0': number;
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
    '6': number;
    '7': number;
    '8': number;
    '9': number;
    'f1': number;
    'f2': number;
    'f3': number;
    'f4': number;
    'f5': number;
    'f6': number;
    'f7': number;
    'f8': number;
    'f9': number;
    'f10': number;
    'f11': number;
    'f12': number;
    'numpad 0': number;
    'numpad 1': number;
    'numpad 2': number;
    'numpad 3': number;
    'numpad 4': number;
    'numpad 5': number;
    'numpad 6': number;
    'numpad 7': number;
    'numpad 8': number;
    'numpad 9': number;
}

export declare interface AliasesMap {
    'windows': number;
    '⇧': number;
    '⌥': number;
    '⌃': number;
    '⌘': number;
    'ctl': number;
    'control': number;
    'option': number;
    'pause': number;
    'break': number;
    'caps': number;
    'return': number;
    'escape': number;
    'spc': number;
    'spacebar': number;
    'pgup': number;
    'pgdn': number;
    'ins': number;
    'del': number;
    'cmd': number;
}