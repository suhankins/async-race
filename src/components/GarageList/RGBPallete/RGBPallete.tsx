import { useRef } from 'react';
import styles from './RGBPallete.module.scss';
import { useClickPosition } from './hooks/useClickPosition';
import { hslToHex } from './hslToHex';

export function RGBPallete({ defaultValue }: { defaultValue?: string }) {
    const huePickerRef = useRef<HTMLDivElement>(null);
    const saturationLightnessPickerRef = useRef<HTMLDivElement>(null);

    const [{ x: hue }] = useClickPosition(huePickerRef);
    const [{ x: saturationPosition, y: lightnessPosition }] = useClickPosition(
        saturationLightnessPickerRef
    );
    const saturation = saturationPosition;
    const lightness = 1 - lightnessPosition;

    return (
        <div className={styles.picker}>
            <div
                className={styles.saturationLightnessPicker}
                style={{
                    backgroundColor: `hsl(${hue * 360}, 100%, 50%)`,
                }}
                ref={saturationLightnessPickerRef}
            >
                <div className={styles.saturationBackground} />
                <div className={styles.lightnessBackground} />
                <div
                    className={styles.pointer}
                    style={{
                        left: `${saturationPosition * 100}%`,
                        top: `${lightnessPosition * 100}%`,
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
            <p
                style={{
                    color: `hsl(${hue * 360}, ${saturation * 100}%, ${
                        lightness * 100
                    }%)`,
                }}
            >
                <p
                    style={{
                        color: `hsl(${hue * 360}, ${saturation * 100}%, ${
                            lightness * 100
                        }%)`,
                    }}
                >
                    {hue * 360}, {saturation * 100}%, {lightness * 100}%
                </p>
                <p
                    style={{
                        color: hslToHex(hue, saturation, lightness),
                    }}
                >
                    {hslToHex(hue, saturation, lightness)}
                </p>
            </p>
        </div>
    );
}
