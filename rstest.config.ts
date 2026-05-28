import { defineConfig } from "@rstest/core"

export default defineConfig({
	// Run in Node — Mozaik is a server-side agent framework, not a browser library.
	testEnvironment: "node",
	// Discover unit and integration suites under tests/.
	include: ["tests/**/*.{test,spec}.ts"],
	// Seed dummy provider credentials before any suite runs.
	setupFiles: ["./tests/setup.ts"],
	// Read the project's path aliases (@app, @domain, @infra) from tsconfig.
	source: {
		tsconfigPath: "./tsconfig.json",
	},
	// Resolve the same aliases explicitly so tests import internal modules the
	// way the source does, regardless of tsconfig auto-detection.
	resolve: {
		alias: {
			"@app": "./src/application",
			"@domain": "./src/domain",
			"@infra": "./src/infrastructure",
		},
	},
})
