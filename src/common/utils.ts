

/**
 * This method makes sure that a string is a JSON
 */
export function isJSON(string: string): boolean {
    try {
        JSON.parse(string);
        return true;
    } catch (error) {
        return false;
    }
}