import tinyColor from 'tinycolor2';

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
    const color = tinyColor(hex);
    const { h: hue, s: saturation, v: value } = color.toHsv();
    return { hue: hue / 360, saturation, value };
}

/**
 * Converts HSV to hex
 * @param {number} hue hue from 0 to 1
 * @param {number} saturation saturation from 0 to 1
 * @param {number} value value from 0 to 1
 * @returns
 */
export function hsvToHex(
    hue: number,
    saturation: number,
    value: number
): string {
    const color = tinyColor({ h: hue * 360, s: saturation, v: value });
    return color.toHexString();
}
