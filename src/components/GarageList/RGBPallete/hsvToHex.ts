/**
 * Converts hex to HSV
 * @param {string} hex string like '#ff0000'
 * @returns object with hue, saturation, and value (all 0 to 1)
 */
export function hexToHsv(hex: string): {
    hue: number;
    saturation: number;
    value: number;
} {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, '');

    // Extract the RGB values from the hex string
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 2), 16) / 255;
    const b = parseInt(hex.slice(4, 2), 16) / 255;

    // Find the maximum and minimum values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    let v = max;

    // Calculate the hue
    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h *= 60;
    }

    // Calculate the saturation
    if (max !== 0) {
        s = delta / max;
    }

    return { hue: h / 360, saturation: s, value: v };
}

function getHex(number: number) {
    return Math.round(number * 255)
        .toString(16)
        .padStart(2, '0');
}

/**
 * Converts HSV to hex
 * @param {number} h hue from 0 to 1
 * @param {number} s saturation from 0 to 1
 * @param {number} v value from 0 to 1
 * @returns
 */
export function hsvToHex(h: number, s: number, v: number): string {
    // Normalize the values
    const normalizedH = h * 360;
    const normalizedS = Math.max(0, Math.min(1, s));
    const normalizedV = Math.max(0, Math.min(1, v));

    const chroma = normalizedV * normalizedS;
    const x = chroma * (1 - Math.abs(((normalizedH / 60) % 2) - 1));
    const minimumValue = normalizedV - chroma;
    let r = 0;
    let g = 0;
    let b = 0;

    if (normalizedH >= 0 && normalizedH < 60) {
        r = chroma;
        g = x;
    } else if (normalizedH >= 60 && normalizedH < 120) {
        r = x;
        g = chroma;
    } else if (normalizedH >= 120 && normalizedH < 180) {
        g = chroma;
        b = x;
    } else if (normalizedH >= 180 && normalizedH < 240) {
        g = x;
        b = chroma;
    } else if (normalizedH >= 240 && normalizedH < 300) {
        r = x;
        b = chroma;
    } else if (normalizedH >= 300 && normalizedH < 360) {
        r = chroma;
        b = x;
    }

    const hexR = getHex(r + minimumValue);
    const hexG = getHex(g + minimumValue);
    const hexB = getHex(b + minimumValue);

    return `#${hexR}${hexG}${hexB}`;
}
