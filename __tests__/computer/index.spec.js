const os = require('os');
const { getOS } = require('../../src/computer');

jest.mock('os');

describe('getOS', () => {
    test('should return "Darwin (macOS)" for darwin platform', () => {
        os.platform.mockReturnValue('darwin');
        expect(getOS()).toBe('Darwin (macOS)');
    });

    test('should return "Windows" for win32 platform', () => {
        os.platform.mockReturnValue('win32');
        expect(getOS()).toBe('Windows');
    });

    test('should return "Linux" for linux platform', () => {
        os.platform.mockReturnValue('linux');
        expect(getOS()).toBe('Linux');
    });

    test('should return "IBM AIX" for aix platform', () => {
        os.platform.mockReturnValue('aix');
        expect(getOS()).toBe('IBM AIX');
    });

    test('should return "FreeBSD" for freebsd platform', () => {
        os.platform.mockReturnValue('freebsd');
        expect(getOS()).toBe('FreeBSD');
    });

    test('should return "OpenBSD" for openbsd platform', () => {
        os.platform.mockReturnValue('openbsd');
        expect(getOS()).toBe('OpenBSD');
    });

    test('should return "SunOS" for sunos platform', () => {
        os.platform.mockReturnValue('sunos');
        expect(getOS()).toBe('SunOS');
    });

    test('should return platform for unknown platform', () => {
        const unknownPlatform = 'unknown';
        os.platform.mockReturnValue(unknownPlatform);
        expect(getOS()).toBe(unknownPlatform);
    });

    test('should return "Unknown" on error', () => {
        os.platform.mockImplementation(() => {
            throw new Error('error');
        });
        expect(getOS()).toBe('Unknown');
    });
});
