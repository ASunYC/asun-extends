import * as os from 'os';
import { execSync } from 'child_process';

/**
 * 获取操作系统类型
 * 'aix'：IBM AIX
 * 'darwin'：Darwin (macOS)
 * 'freebsd'：FreeBSD
 * 'linux'：Linux
 * 'openbsd'：OpenBSD
 * 'sunos'：SunOS
 * 'win32'：Windows
 * @returns 返回操作系统类型字符串，如果获取失败则返回'Unknown'
 */
export function getOS() {
    try {
        const platform = os.platform();
        if (platform === 'darwin') {
            return 'Darwin (macOS)';
        } else if (platform === 'win32') {
            return 'Windows';
        } else if (platform === 'linux') {
            return 'Linux';
        } else if (platform === 'aix') {
            return 'IBM AIX';
        } else if (platform === 'freebsd') {
            return 'FreeBSD';
        } else if (platform === 'openbsd') {
            return 'OpenBSD';
        } else if (platform === 'sunos') {
            return 'SunOS';
        } else {
            return platform;
        }
    } catch (e) {
        return 'Unknown';
    }
}

interface MotherboardInfoWindows {
    manufacturer?: string;
    product?: string;
    version?: string;
    serialnumber?: string;
}

interface MotherboardInfoLinux {
    manufacturer?: string;
    product?: string;
    version?: string;
    serialNumber?: string;
}

interface MotherboardInfoMacOS {
    [key: string]: string;
}

export class BoardInfo {
    public static getMotherboardInfo(): MotherboardInfoWindows | MotherboardInfoLinux | MotherboardInfoMacOS | string {
        const platform = os.platform();

        if (platform === 'win32') {
            return this.getWindowsMotherboardInfo();
        } else if (platform === 'linux') {
            return this.getLinuxMotherboardInfo();
        } else if (platform === 'darwin') {
            return this.getMacOSMotherboardInfo();
        } else {
            return 'Unsupported OS';
        }
    }

    private static getWindowsMotherboardInfo(): MotherboardInfoWindows | string {
        try {
            const result = execSync('wmic baseboard get product,manufacturer,version,serialnumber').toString();
            return this.parseWindowsResult(result);
        } catch (error) {
            console.error('Error getting Windows motherboard info:', error);
            return 'Unknown';
        }
    }

    private static getLinuxMotherboardInfo(): MotherboardInfoLinux | string {
        try {
            const manufacturer = execSync('cat /sys/class/dmi/id/board_vendor').toString().trim();
            const product = execSync('cat /sys/class/dmi/id/board_name').toString().trim();
            const version = execSync('cat /sys/class/dmi/id/board_version').toString().trim();
            const serialNumber = execSync('cat /sys/class/dmi/id/board_serial').toString().trim();
            return { manufacturer, product, version, serialNumber };
        } catch (error) {
            console.error('Error getting Linux motherboard info:', error);
            return 'Unknown';
        }
    }

    private static getMacOSMotherboardInfo(): MotherboardInfoMacOS | string {
        try {
            const result = execSync('system_profiler SPHardwareDataType').toString();
            return this.parseMacOSResult(result);
        } catch (error) {
            console.error('Error getting macOS motherboard info:', error);
            return 'Unknown';
        }
    }

    private static parseWindowsResult(result: string): MotherboardInfoWindows {
        const lines = result.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return {};

        const headers = lines[0].trim().split(/\s+/);
        const values = lines[1].trim().split(/\s+/);

        const info: MotherboardInfoWindows = {};
        headers.forEach((header, index) => {
            info[header.toLowerCase() as keyof MotherboardInfoWindows] = values[index];
        });

        return info;
    }

    private static parseMacOSResult(result: string): MotherboardInfoMacOS {
        const lines = result.split('\n').filter(line => line.trim() !== '');
        const info: MotherboardInfoMacOS = {};

        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim().replace(' ', '_').toLowerCase();
                const value = parts[1].trim();
                info[key] = value;
            }
        });

        return info;
    }
}

export class BIOSInfo {
    public static getBIOSSerialNumber(): string {
        const platform = os.platform();

        if (platform === 'win32') {
            return this.getWindowsBIOSSerialNumber();
        } else if (platform === 'linux') {
            return this.getLinuxBIOSSerialNumber();
        } else if (platform === 'darwin') {
            return this.getMacOSBIOSSerialNumber();
        } else {
            return 'Unsupported OS';
        }
    }

    private static getWindowsBIOSSerialNumber(): string {
        try {
            const result = execSync('wmic bios get serialnumber').toString();
            const lines = result.split('\n').filter(line => line.trim() !== '');
            return lines.length > 1 ? lines[1].trim() : 'Unknown';
        } catch (error) {
            console.error('Error getting Windows BIOS serial number:', error);
            return 'Unknown';
        }
    }

    private static getLinuxBIOSSerialNumber(): string {
        try {
            const serialNumber = execSync('cat /sys/class/dmi/id/bios_version').toString().trim();
            return serialNumber || 'Unknown';
        } catch (error) {
            console.error('Error getting Linux BIOS serial number:', error);
            return 'Unknown';
        }
    }

    private static getMacOSBIOSSerialNumber(): string {
        try {
            const result = execSync('system_profiler SPHardwareDataType').toString();
            const lines = result.split('\n').filter(line => line.includes('Serial Number (system)'));
            if (lines.length > 0) {
                const parts = lines[0].split(':');
                return parts.length === 2 ? parts[1].trim() : 'Unknown';
            }
            return 'Unknown';
        } catch (error) {
            console.error('Error getting macOS BIOS serial number:', error);
            return 'Unknown';
        }
    }
}

export class GPUInfo {
    public static getGraphicsCardInfo(): string {
        const platform = os.platform();

        if (platform === 'win32') {
            return this.getWindowsGraphicsCardInfo();
        } else if (platform === 'linux') {
            return this.getLinuxGraphicsCardInfo();
        } else if (platform === 'darwin') {
            return this.getMacOSGraphicsCardInfo();
        } else {
            return 'Unsupported OS';
        }
    }

    private static getWindowsGraphicsCardInfo(): string {
        try {
            const result = execSync('wmic path win32_videocontroller get caption').toString();
            const lines = result.split('\n').filter(line => line.trim() !== '');
            // Skip header line
            return lines.length > 1 ? lines.slice(1).map(line => line.trim()).join(', ') : 'Unknown';
        } catch (error) {
            console.error('Error getting Windows graphics card info:', error);
            return 'Unknown';
        }
    }

    private static getLinuxGraphicsCardInfo(): string {
        try {
            const result = execSync('lspci | grep VGA').toString();
            return result.trim() || 'Unknown';
        } catch (error) {
            console.error('Error getting Linux graphics card info:', error);
            return 'Unknown';
        }
    }

    private static getMacOSGraphicsCardInfo(): string {
        try {
            const result = execSync('system_profiler SPDisplaysDataType').toString();
            return this.parseMacOSGraphicsCardResult(result);
        } catch (error) {
            console.error('Error getting macOS graphics card info:', error);
            return 'Unknown';
        }
    }

    private static parseMacOSGraphicsCardResult(result: string): string {
        const lines = result.split('\n').filter(line => line.trim() !== '');
        const info: string[] = [];

        lines.forEach(line => {
            if (line.includes('Chipset Model:') || line.includes('Model:')) {
                const parts = line.split(':');
                if (parts.length === 2) {
                    info.push(parts[1].trim());
                }
            }
        });

        return info.join(', ') || 'Unknown';
    }
}

export class CPUInfo {
    public static getCPUInfo(): string {
        const platform = os.platform();

        if (platform === 'win32') {
            return this.getWindowsCPUInfo();
        } else if (platform === 'linux') {
            return this.getLinuxCPUInfo();
        } else if (platform === 'darwin') {
            return this.getMacOSCPUInfo();
        } else {
            return 'Unsupported OS';
        }
    }

    private static getWindowsCPUInfo(): string {
        try {
            const result = execSync('wmic cpu get processorid').toString();
            const lines = result.split('\n').filter(line => line.trim() !== '');
            return lines.length > 1 ? lines[1].trim() : 'Unknown';
        } catch (error) {
            console.error('Error getting Windows CPU info:', error);
            return 'Unknown';
        }
    }

    private static getLinuxCPUInfo(): string {
        try {
            const result = execSync('cat /proc/cpuinfo | grep Serial').toString();
            const lines = result.split('\n').filter(line => line.trim() !== '');
            return lines.length > 0 ? lines[0].split(':')[1].trim() : 'Unknown';
        } catch (error) {
            console.error('Error getting Linux CPU info:', error);
            return 'Unknown';
        }
    }

    private static getMacOSCPUInfo(): string {
        try {
            const result = execSync('system_profiler SPHardwareDataType').toString();
            const lines = result.split('\n').filter(line => line.includes('Processor ID'));
            if (lines.length > 0) {
                const parts = lines[0].split(':');
                return parts.length === 2 ? parts[1].trim() : 'Unknown';
            }
            return 'Unknown';
        } catch (error) {
            console.error('Error getting macOS CPU info:', error);
            return 'Unknown';
        }
    }
}

export class MACInfo {
    public static getMACAddress(): string {
        const platform = os.platform();

        if (platform === 'win32') {
            return this.getWindowsMACAddress();
        } else if (platform === 'linux') {
            return this.getLinuxMACAddress();
        } else if (platform === 'darwin') {
            return this.getMacOSMACAddress();
        } else {
            return 'Unsupported OS';
        }
    }

    private static getWindowsMACAddress(): string {
        try {
            const result = execSync('getmac').toString();
            const lines = result.split('\n').filter(line => line.trim() !== '');
            if (lines.length > 0) {
                return lines[0].split(/\s+/)[0].trim(); // Get the first MAC address
            }
            return 'Unknown';
        } catch (error) {
            console.error('Error getting Windows MAC address:', error);
            return 'Unknown';
        }
    }

    private static getLinuxMACAddress(): string {
        try {
            const result = execSync('ip link show').toString();
            const lines = result.split('\n').filter(line => line.includes('link/ether'));
            if (lines.length > 0) {
                return lines[0].split(' ')[1].trim(); // Get the first MAC address
            }
            return 'Unknown';
        } catch (error) {
            console.error('Error getting Linux MAC address:', error);
            return 'Unknown';
        }
    }

    private static getMacOSMACAddress(): string {
        try {
            const result = execSync('ifconfig').toString();
            const lines = result.split('\n').filter(line => line.includes('en0') || line.includes('en1'));
            if (lines.length > 0) {
                const macLine = lines.find(line => line.includes('ether'));
                return macLine ? macLine.split(' ')[1].trim() : 'Unknown'; // Get MAC address
            }
            return 'Unknown';
        } catch (error) {
            console.error('Error getting macOS MAC address:', error);
            return 'Unknown';
        }
    }
}