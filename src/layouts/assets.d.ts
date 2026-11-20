/* Image imports in layouts and their sample files resolve to a URL (Vite / Storybook). */
declare module "*.png" {
	const src: string;
	export default src;
}

declare module "*.jpg" {
	const src: string;
	export default src;
}

declare module "*.svg" {
	const src: string;
	export default src;
}
