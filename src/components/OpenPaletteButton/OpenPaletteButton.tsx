import styles from './OpenPaletteButton.module.scss';
import { RGBPalette } from './RGBPalette/RGBPalette';

interface OpenPaletteButtonProps {
    defaultValue?: string;
    updateColor: (value: string) => void;
}

export function OpenPaletteButton({
    defaultValue,
    updateColor,
}: OpenPaletteButtonProps) {
    if (
        defaultValue === undefined ||
        defaultValue === '' ||
        defaultValue === null
    ) {
        defaultValue = '#ff0000';
    }

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={`btn btn-outline-primary ${styles.openPaletteButton}`}
                aria-label="Open color picker"
            >
                <div style={{ backgroundColor: defaultValue }} />
            </button>
            <RGBPalette
                defaultValue={defaultValue}
                updateColor={updateColor}
                className={styles.palette}
                tabIndex={-1}
            />
        </div>
    );
}
