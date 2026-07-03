import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, defaultValue?: string) {
    const value = process.env[name];

    if (!value && !defaultValue) {
        throw new Error(`❌ Missing environment variable: ${name}`);
    }

    return value || defaultValue !;
    }
export const env = {
    nodeEnv: getEnv("NODE_ENV", "development"),
    port: Number(getEnv("PORT", "8080"))
};