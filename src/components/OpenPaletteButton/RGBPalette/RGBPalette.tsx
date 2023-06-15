import { HTMLAttributes, useMemo, useRef } from 'react';
import styles from './RGBPalette.module.scss';
import { useClickPosition } from './hooks/useClickPosition';
import { hexToHsv, hsvToHex } from './hsvToHex';

interface RGBPaletteProps extends HTMLAttributes<HTMLDivElement> {
    defaultValue?: string;
    updateColor: (value: string) => void;
    className?: string;
}

export function RGBPalette({
    defaultValue,
    updateColor,
    className,
    ...props
}: RGBPaletteProps) {
    const defaultHsv = useMemo(
        () =>
            defaultValue
                ? hexToHsv(defaultValue)
                : { hue: 0, saturation: 1, value: 1 },
        [defaultValue]
    );

    const huePickerRef = useRef<HTMLDivElement>(null);
    const [{ x: hue }] = useClickPosition(huePickerRef, {
        x: defaultHsv.hue,
        y: 0,
    });

    const saturationValuePickerRef = useRef<HTMLDivElement>(null);
    const [{ x: saturation, y: valuePosition }] = useClickPosition(
        saturationValuePickerRef,
        { x: defaultHsv.saturation, y: 1 - defaultHsv.value }
    );

    const value = 1 - valuePosition;

    return (
        <div className={`${styles.picker} ${className ?? ''}`} {...props}>
            <div
                className={styles.saturationLightnessPicker}
                style={{
                    backgroundColor: `hsl(${hue * 360}, 100%, 50%)`,
                }}
                ref={saturationValuePickerRef}
            >
                <div className={styles.saturationBackground} />
                <div className={styles.lightnessBackground} />
                <div
                    className={styles.pointer}
                    style={{
                        left: `${saturation * 100}%`,
                        top: `${valuePosition * 100}%`,
                    }}
                />
            </div>
            <div className={styles.huePicker} ref={huePickerRef}>
                <div
                    className={styles.pointer}
                    style={{
                        left: `${hue * 100}%`,
                    }}
                />
            </div>
            <button
                type="button"
                onClick={() => updateColor(hsvToHex(hue, saturation, value))}
            >
                Submit
            </button>
        </div>
    );
}
