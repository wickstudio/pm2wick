/**
 * Reads the configuration file and returns the configuration object.
 * If the configuration file does not exist, it returns an empty object.
 * @returns {Record<string, any>} The configuration object.
 */
export declare function getConfig(): Record<string, any>;
/**
 * Updates the configuration file with the provided configuration object.
 * If the configuration file does not exist, it creates one.
 * @param {Record<string, any>} newConfig - The new configuration values.
 */
export declare function setConfig(newConfig: Record<string, any>): void;
/**
 * Clears the configuration file, resetting it to an empty object.
 */
export declare function clearConfig(): void;
