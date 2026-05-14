import type { Config } from "jest";

/**
 * Jest configuration for backend TypeScript tests.
 */
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["src/services/**/*.ts", "src/repositories/**/*.ts"],
};

export default config;
