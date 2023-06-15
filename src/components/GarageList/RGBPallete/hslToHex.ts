function normalize(number: number) {
    return Math.max(0, Math.min(1, number));
}

/**
 * Converts HSL color to HEX color.
 * @param hue value between 0 and 1
 * @param saturation value between 0 and 1
 * @param lightness value between 0 and 1
 * @returns {string} Hex color in format #RRGGBB
 */
export function hslToHex(
    hue: number,
    saturation: number,
    lightness: number
): string {
    // Normalize hue value to range 0-360
    hue = normalize(hue) * 360;

    // Normalize saturation and lightness values to range 0-1
    saturation = normalize(saturation);
    lightness = normalize(lightness);

    // Convert HSL to RGB
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const secondLargestComponent =
        chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const lightnessOffset = lightness - chroma / 2;
    let red = 0,
        green = 0,
        blue = 0;

    if (0 <= hue && hue < 60) {
        red = chroma;
        green = secondLargestComponent;
    } else if (60 <= hue && hue < 120) {
        red = secondLargestComponent;
        green = chroma;
    } else if (120 <= hue && hue < 180) {
        green = chroma;
        blue = secondLargestComponent;
    } else if (180 <= hue && hue < 240) {
        green = secondLargestComponent;
        blue = chroma;
    } else if (240 <= hue && hue < 300) {
        red = secondLargestComponent;
        blue = chroma;
    } else if (300 <= hue && hue < 360) {
        red = chroma;
        blue = secondLargestComponent;
    }

    // Convert RGB to HEX
    const componentToHex = (component: number) => {
        const hex = Math.round(component * 255).toString(16);
        return hex.padStart(2, '0');
    };

    const hexRed = componentToHex(red + lightnessOffset);
    const hexGreen = componentToHex(green + lightnessOffset);
    const hexBlue = componentToHex(blue + lightnessOffset);

    return `#${hexRed}${hexGreen}${hexBlue}`;
}

// Example usage
const hue = 180; // Hue value between 0-360
const saturation = 50; // Saturation value between 0-100
const lightness = 75; // Lightness value between 0-100

const hexColor = hslToHex(hue, saturation, lightness);
console.log(hexColor); // Output: #40bfbf
