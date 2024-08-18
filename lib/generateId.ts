import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

const ID_FILE = path.join(__dirname, '..', 'user-id.txt');

/**
 * Generates a unique ID and saves it to a file, or retrieves the existing ID if already generated.
 * 
 * @param {typeof fs} customFs - An optional custom file system module for testing or alternate environments.
 * @returns {string} - The unique ID.
 * @throws Will throw an error if reading or writing the ID file fails.
 */
export function generateUniqueId(customFs = fs): string {
    try {
        // Check if the ID file already exists
        if (customFs.existsSync(ID_FILE)) {
            // Read and return the existing unique ID
            return customFs.readFileSync(ID_FILE, 'utf-8').trim();
        } else {
            // Generate a new unique ID using uuidv4
            const uniqueId = uuidv4();
            // Save the generated ID to the file
            customFs.writeFileSync(ID_FILE, uniqueId, 'utf-8');
            return uniqueId;
        }
    } catch (error) {
        console.error('Failed to generate or read unique ID:', error);
        // Re-throw the error to allow further handling by the caller
        throw error;
    }
}
