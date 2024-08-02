/**
 * An abstract logger interface, which can be used to customize log behaviour.
 * Usually, you can pass `console` for convinience.
 * Or you can write your own implementation, for example, to report to a log system, or hide some log output.
 */
export interface Logger {
    debug(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

const empty = () => { };

export function getLogTimer(flag?: string) {
    if (isEmptyString(flag)) {
        flag = 'Default';
    }
    const now = new Date();
    now.setHours(now.getHours() + 8);
    const currentTime = now.toISOString().slice(0, 19).replace('T', ' ');
    return `[${flag}]: [${currentTime}]`;
}

function isEmptyString(value: string | null | undefined): boolean {
    return value === null || value === undefined || value === '';
}

export function setLogLevel(logger: Logger, logLevel: LogLevel): Logger {
    switch (logLevel) {
        case 'none':
            return { debug: empty, log: empty, warn: empty, error: empty };
        case 'error':
            return { debug: empty, log: empty, warn: empty, error: logger.error.bind(logger) };
        case 'warn':
            return { debug: empty, log: empty, warn: logger.warn.bind(logger), error: logger.error.bind(logger) };
        case 'info':
            return { debug: empty, log: logger.log.bind(logger), warn: logger.warn.bind(logger), error: logger.error.bind(logger) };
        case 'debug':
            return logger;
        default:
            throw new Error(`Invalid logLevel: '${logLevel}'`)
    }
}