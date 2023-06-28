export function FlagIcon({
    className,
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 250 352"
            className={className}
            style={style}
        >
            <path
                fill="none"
                stroke="#000000"
                strokeWidth="21"
                strokeLinecap="round"
                d="M42 327l0 -291"
            />
            <path
                fill="#ff2a2a"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
                d="M49 50c70,30 104,28 178,2 -21,42 -21,74 0,116 -72,25 -101,25 -178,0l0 -118z"
            />
        </svg>
    );
}
