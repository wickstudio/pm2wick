"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.setConfig = setConfig;
exports.clearConfig = clearConfig;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const CONFIG_FILE = path.join(__dirname, '..', 'config.json');
/**
 * Reads the configuration file and returns the configuration object.
 * If the configuration file does not exist, it returns an empty object.
 * @returns {Record<string, any>} The configuration object.
 */
function getConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const configFile = fs.readFileSync(CONFIG_FILE, 'utf-8');
            return JSON.parse(configFile);
        }
        else {
            return {};
        }
    }
    catch (error) {
        console.error('Failed to read configuration:', error);
        throw error;
    }
}
/**
 * Updates the configuration file with the provided configuration object.
 * If the configuration file does not exist, it creates one.
 * @param {Record<string, any>} newConfig - The new configuration values.
 */
function setConfig(newConfig) {
    try {
        const config = getConfig();
        const updatedConfig = { ...config, ...newConfig };
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('Failed to update configuration:', error);
        throw error;
    }
}
/**
 * Clears the configuration file, resetting it to an empty object.
 */
function clearConfig() {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('Failed to clear configuration:', error);
        throw error;
    }
}
