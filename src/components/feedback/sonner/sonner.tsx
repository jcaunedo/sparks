import * as React from "react";
import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

/*
 * shadcn/ui's Sonner (new-york-v4), on `sonner`. Without next-themes: the theme follows `.dark` on the page, as the tokens
 * do. Drawn on the popover tokens with the menus' corners (`rounded-menu`, 16px) and `shadow-xl`, in Figtree (Sonner
 * brings its own system font otherwise). Not in sparks.ds yet.
 */

/** Whether the page is in dark mode (`.dark` on `<html>`), kept up to date. */
function useDarkClass() {
	const [dark, setDark] = React.useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
	React.useEffect(() => {
		const root = document.documentElement;
		const observer = new MutationObserver(() => setDark(root.classList.contains("dark")));
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);
	return dark;
}

/**
 * Where toasts show: mount it once, near the app's root, then call `toast("…")` (or `toast.success`, `toast.error`…)
 * from anywhere. A short confirmation that something happened, which goes away on its own.
 */
function Toaster({ toastOptions, ...props }: ToasterProps) {
	const dark = useDarkClass();
	return (
		<Sonner
			theme={dark ? "dark" : "light"}
			className='toaster group'
			icons={{
				// Each kind's icon in its tone's color, as InlineAlert's.
				success: <CircleCheck className='size-4 text-success' />,
				info: <Info className='size-4 text-info' />,
				warning: <TriangleAlert className='size-4 text-warning' />,
				error: <OctagonX className='size-4 text-destructive' />,
				loading: <LoaderCircle className='size-4 animate-spin motion-reduce:animate-none' />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius-menu)",
				} as React.CSSProperties
			}
			toastOptions={{
				...toastOptions,
				classNames: {
					toast: "font-sans shadow-xl! gap-3!",
					title: "text-sm! font-semibold! text-foreground!",
					description: "text-sm! text-foreground!",
					actionButton: "h-7! rounded-md! bg-foreground! px-2.5! text-xs! font-semibold! text-background!",
					...toastOptions?.classNames,
				},
			}}
			{...props}
		/>
	);
}

export { Toaster, toast, type ToasterProps };
