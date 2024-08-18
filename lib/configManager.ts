import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILE = path.join(__dirname, '..', 'config.json');

/**
 * Retrieves the current configuration from the config file.
 * 
 * @returns {Record<string, any>} The configuration object.
 * @throws Will throw an error if reading the configuration file fails.
 */
export function getConfig(): Record<string, any> {
    try {
        // Check if the configuration file exists
        if (fs.existsSync(CONFIG_FILE)) {
            // Read and parse the configuration file
            const configFile = fs.readFileSync(CONFIG_FILE, 'utf-8');
            return JSON.parse(configFile);
        } else {
            // Return an empty object if the configuration file does not exist
            return {};
        }
    } catch (error) {
        console.error('Failed to read configuration:', error);
        // Re-throw the error to allow further handling by the caller
        throw error;
    }
}

/**
 * Updates the configuration file with new values.
 * 
 * @param {Record<string, any>} newConfig - The new configuration values to be merged with the existing config.
 * @throws Will throw an error if writing to the configuration file fails.
 */
export function setConfig(newConfig: Record<string, any>): void {
    try {
        // Retrieve the current configuration
        const config = getConfig();

        // Merge the new configuration with the existing one
        const updatedConfig = { ...config, ...newConfig };

        // Write the updated configuration back to the file
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to update configuration:', error);
        // Re-throw the error to allow further handling by the caller
        throw error;
    }
}

/**
 * Clears the configuration file, resetting it to an empty object.
 * 
 * @throws Will throw an error if clearing the configuration file fails.
 */
export function clearConfig(): void {
    try {
        // Write an empty object to the configuration file
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to clear configuration:', error);
        // Re-throw the error to allow further handling by the caller
        throw error;
    }
}
