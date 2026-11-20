import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: [
		"react",
		"react-dom",
		"react/jsx-runtime",
		"@radix-ui/react-avatar",
		"@radix-ui/react-slot",
		"@radix-ui/react-tabs",
		"@hookform/resolvers",
		"react-hook-form",
		"zod",
		"class-variance-authority",
		"clsx",
		"tailwind-merge",
	],
	treeshake: true,
	splitting: false,
	minify: false,
});
