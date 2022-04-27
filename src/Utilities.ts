/**
 * Gets whether the value provided is null or undefined.
 * @param value The value to check.
 * @returns Whether the value provided is null or undefined.
 */
export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

/**
 * Gets whether the value provided is a natural number.
 * @param value The value to check.
 * @returns Whether the value provided is a natural number.
 */
export function isNaturalNumber(value: number): boolean {
    return typeof value === "number" && value >= 1 && Math.floor(value) === value;
}
