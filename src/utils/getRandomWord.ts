/**
 * Dictionary of words to generate random car names
 */
const dictionary = [
    'speed',
    'action',
    'wheels',
    'fire',
    'meower',
    'ultra',
    'advanced',
    'extreme',
    'burner',
    'rubber',
    'steel',
    'knight',
    'racer',
    'last',
    'first',
    'super',
    'mega',
    'giga',
    'hyper',
    'turbo',
    'light',
    'heavy',
    'fast',
    'slow',
    'furious',
    'fury',
];

/**
 * Returns random word from dictionary
 * @returns {string} Random word from dictionary
 */
export function getRandomWord(): string {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}
