import styles from './RGBPallete.module.scss';
import { useClickPosition } from './hooks/useClickPosition';
import hslToHex from 'hsl-to-hex';

export function RGBPallete({ defaultValue }: { defaultValue?: string }) {
    const [{ x: hue }, hueOnClickHandler] = useClickPosition();
    const [
        { x: saturationPosition, y: lightnessPosition },
        saturationLightnessOnClickHandler,
    ] = useClickPosition();
    const saturation = saturationPosition;
    const lightness = 1 - lightnessPosition;

    return (
        <div className={styles.picker}>
            <div
                className={styles.saturationLightnessPicker}
                style={{
                    backgroundColor: `hsl(${hue * 360}, 100%, 50%)`,
                }}
                onMouseDown={saturationLightnessOnClickHandler}
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
            <div className={styles.huePicker} onMouseDown={hueOnClickHandler}>
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
                {hslToHex(hue * 360, saturation * 100, lightness * 100)}
            </p>
        </div>
    );
}
