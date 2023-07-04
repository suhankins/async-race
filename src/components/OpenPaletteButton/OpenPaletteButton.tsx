import styles from './OpenPaletteButton.module.scss';
import { RGBPalette } from './RGBPalette/RGBPalette';

interface OpenPaletteButtonProps {
    disabled?: boolean;
    defaultValue?: string;
    updateColor: (value: string) => void;
}

export function OpenPaletteButton({
    disabled,
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
                disabled={disabled}
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
