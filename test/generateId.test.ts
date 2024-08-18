import * as fs from 'fs';
import * as path from 'path';
import { generateUniqueId } from '../lib/generateId';

const ID_FILE = path.join(__dirname, '..', 'user-id.txt');

describe('generateId', () => {
    // Clean up the ID file before each test to ensure isolation
    beforeEach(() => {
        if (fs.existsSync(ID_FILE)) {
            fs.unlinkSync(ID_FILE);
        }
    });

    // Clear all mocks after each test to reset the mock state
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Remove the ID file after all tests are completed
    afterAll(() => {
        if (fs.existsSync(ID_FILE)) {
            fs.unlinkSync(ID_FILE);
        }
    });

    test('generateUniqueId should create a new ID and save it to a file', () => {
        // Generate a unique ID
        const id = generateUniqueId();

        // Assert that the ID is a non-empty string
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);

        // Assert that the ID file exists and contains the correct ID
        expect(fs.existsSync(ID_FILE)).toBe(true);
        const savedId = fs.readFileSync(ID_FILE, 'utf-8').trim();
        expect(savedId).toBe(id);
    });

    test('generateUniqueId should return the existing ID if the file already exists', () => {
        // Generate the first ID and then generate it again
        const firstId = generateUniqueId();
        const secondId = generateUniqueId();

        // Assert that the second ID matches the first one (i.e., it was read from the file)
        expect(secondId).toBe(firstId);
    });

    test('generateUniqueId should handle errors gracefully', () => {
        // Mock a custom fs module to simulate an error when writing the file
        const mockFs = {
            writeFileSync: jest.fn(() => {
                throw new Error('Mocked error');
            }),
            existsSync: jest.fn(() => false),
            readFileSync: jest.fn()
        };

        // Mock console.error to suppress error output during the test
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
            generateUniqueId(mockFs as unknown as typeof fs);
        } catch (error) {
            // Assert that the error message is as expected
            expect((error as any).message).toBe('Mocked error');
        }

        // Assert that writeFileSync was called, indicating an attempt to write the ID file
        expect(mockFs.writeFileSync).toHaveBeenCalled();

        // Restore the original console.error after the test
        consoleErrorMock.mockRestore();
    });
});
