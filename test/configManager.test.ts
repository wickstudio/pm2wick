import * as fs from 'fs';
import * as path from 'path';
import { getConfig, setConfig, clearConfig } from '../lib/configManager';

const CONFIG_FILE = path.join(__dirname, '..', 'config.json');

describe('ConfigManager', () => {
    // Clear the configuration before each test to ensure isolation
    beforeEach(() => {
        clearConfig();
    });

    // Remove the config file after all tests are completed
    afterAll(() => {
        if (fs.existsSync(CONFIG_FILE)) {
            fs.unlinkSync(CONFIG_FILE);
        }
    });

    test('getConfig should return an empty object if config file does not exist', () => {
        // Test that getConfig returns an empty object when the config file is missing
        const config = getConfig();
        expect(config).toEqual({});
    });

    test('setConfig should create and update the config file', () => {
        // Test that setConfig creates and updates the config file correctly
        const newConfig = { token: 'test-token', prefix: '!' };
        setConfig(newConfig);

        // Verify that the config was saved correctly
        const config = getConfig();
        expect(config).toEqual(newConfig);
    });

    test('setConfig should merge new values with existing config', () => {
        // Test that setConfig correctly merges new values with existing config
        const initialConfig = { token: 'initial-token', prefix: '!' };
        setConfig(initialConfig);

        // Update the config with a new token, keeping the existing prefix
        const updatedConfig = { token: 'updated-token' };
        setConfig(updatedConfig);

        // The expected config should reflect the updated token and the original prefix
        const expectedConfig = { token: 'updated-token', prefix: '!' };
        const config = getConfig();
        expect(config).toEqual(expectedConfig);
    });

    test('clearConfig should reset the config to an empty object', () => {
        // Test that clearConfig correctly resets the config to an empty object
        const newConfig = { token: 'test-token', prefix: '!' };
        setConfig(newConfig);

        clearConfig();

        // After clearing, getConfig should return an empty object
        const config = getConfig();
        expect(config).toEqual({});
    });

    test('getConfig should return the correct config after setting values', () => {
        // Test that getConfig returns the correct config after values have been set
        const newConfig = { token: 'test-token', prefix: '!' };
        setConfig(newConfig);

        // Verify that the specific properties exist in the config with the correct values
        const config = getConfig();
        expect(config).toHaveProperty('token', 'test-token');
        expect(config).toHaveProperty('prefix', '!');
    });
});
