import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { layoutSpring, useMotionPreference } from "@/lib/motion";

/*
 * Figma sparks.ds → "Tabs Groups" (node 21:542) and "Tabs Items" (node 21:461), on shadcn/ui's Tabs.
 * Two differences from shadcn (DESIGN.md → "Tabs"):
 * - The active tab's look (white pill or underline) is a separate indicator that slides
 *   between tabs with a shared `layoutId` (MOTION.md → Tabs), not a style on the trigger.
 * - The list passes its variant and size to the triggers through context, not group-data selectors.
 */

/* -------------------------------------------------------------------------- */
/* Tabs                                                                       */
/* -------------------------------------------------------------------------- */

type TabsContextValue = {
	/** The active tab's value, mirrored from Radix so the indicator knows where to render. */
	value: string | undefined;
	/** Unique per Tabs, so two tab bars on one page don't share an indicator. */
	indicatorId: string;
};

const TabsContext = React.createContext<TabsContextValue>({
	value: undefined,
	indicatorId: "",
});

/** A set of layered panels, one shown at a time, switched by a row of tabs. */
function Tabs({
	className,
	orientation = "horizontal",
	value,
	defaultValue,
	onValueChange,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
	const indicatorId = React.useId();

	return (
		<TabsContext.Provider value={{ value: value ?? uncontrolledValue, indicatorId }}>
			<TabsPrimitive.Root
				data-slot='tabs'
				data-orientation={orientation}
				orientation={orientation}
				value={value}
				defaultValue={defaultValue}
				onValueChange={(next) => {
					setUncontrolledValue(next);
					onValueChange?.(next);
				}}
				className={cn(
					"group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
					className,
				)}
				{...props}
			/>
		</TabsContext.Provider>
	);
}

/* -------------------------------------------------------------------------- */
/* TabsList                                                                   */
/* -------------------------------------------------------------------------- */

const tabsListVariants = cva(
	"group/tabs-list inline-flex w-fit items-center text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
	{
		variants: {
			variant: {
				// Figma "Variant=Default": tabs on a muted track. 3px padding, no gap.
				default: "rounded-button-md bg-muted p-[3px]",
				// Figma "Variant=Line": underlined tabs, 8px apart.
				line: "gap-2 bg-transparent",
			},
			size: {
				// Figma "ms - 36 (default)".
				default: "h-9",
				// Figma "lg - 40".
				lg: "h-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type TabsListVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
type TabsListSize = NonNullable<VariantProps<typeof tabsListVariants>["size"]>;

const TabsListContext = React.createContext<{
	variant: TabsListVariant;
	size: TabsListSize;
	baseline: boolean;
}>({ variant: "default", size: "default", baseline: false });

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
	VariantProps<typeof tabsListVariants> & {
		/**
		 * `variant="line"` only: a 1px line under every tab, with the active tab's 2px line over it
		 * (Figma "State=Default (line)"). Off by default, as in Figma's Line group.
		 */
		baseline?: boolean;
	};

/** The row of tabs. Sets the look (`variant`) and height (`size`) of every tab in it. */
function TabsList({
	className,
	variant = "default",
	size = "default",
	baseline = false,
	...props
}: TabsListProps) {
	const resolvedVariant = variant ?? "default";
	const resolvedSize = size ?? "default";

	return (
		<TabsListContext.Provider
			value={{ variant: resolvedVariant, size: resolvedSize, baseline }}
		>
			<TabsPrimitive.List
				data-slot='tabs-list'
				data-variant={resolvedVariant}
				data-size={resolvedSize}
				data-baseline={baseline || undefined}
				className={cn(
					tabsListVariants({ variant: resolvedVariant, size: resolvedSize }),
					className,
				)}
				{...props}
			/>
		</TabsListContext.Provider>
	);
}

/* -------------------------------------------------------------------------- */
/* TabsTrigger                                                                */
/* -------------------------------------------------------------------------- */

const tabsTriggerVariants = cva(
	[
		// `isolate` keeps the Default variant's indicator (behind the label) inside the tab.
		"relative isolate inline-flex shrink-0 items-center justify-center gap-1.5 font-semibold whitespace-nowrap text-muted-foreground transition-colors outline-none",
		"hover:text-foreground data-[state=active]:text-foreground",
		// The focus ring is added in TabsTrigger, keyboard focus only (DESIGN.md → "Tabs").
		"disabled:pointer-events-none disabled:opacity-50",
		// Figma's optional 16px icon (hidden "Icon" layer), direct children only.
		"[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
		"group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
	],
	{
		variants: {
			variant: {
				// Figma "Variant=Default": hover and active change the label to foreground.
				default: "rounded-menu-item",
				// Figma "Variant=Line": square, the active tab is underlined.
				line: "rounded-none",
			},
			size: {
				// Figma "ms - 36 (default)": sm/sm semibold (14/20).
				default: "text-sm",
				// Figma "lg - 40": 16px semibold.
				lg: "text-base",
			},
			baseline: {
				// Figma "State=Default (line)": a 1px border line under the tab.
				true: "before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border",
				false: "",
			},
		},
		compoundVariants: [
			// Default, 36: 30px tall (36 - 3px track padding × 2), padding 4/10.
			{ variant: "default", size: "default", className: "h-[30px] px-2.5 py-1" },
			// Default, 40: 34px tall, padding 12 left and right.
			{ variant: "default", size: "lg", className: "h-[34px] px-3" },
			// Line, 36: padding 6/10.
			{ variant: "line", size: "default", className: "h-9 px-2.5 py-1.5" },
			// Line, 40: padding 10 left and right.
			{ variant: "line", size: "lg", className: "h-10 px-2.5" },
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			baseline: false,
		},
	},
);

const tabsIndicatorVariants = cva("pointer-events-none absolute", {
	variants: {
		variant: {
			// Figma "State=Active", Default: white pill with a soft, centered shadow (DESIGN.md → "Tabs").
			default:
				"inset-0 -z-10 rounded-menu-item bg-background shadow-[0_0_4px_-2px_var(--shadow-color-md),0_0_4px_1px_var(--shadow-color-sm)]",
			// Figma "State=Active", Line: 2px foreground line at the bottom, over the baseline.
			line: "inset-x-0 bottom-0 h-0.5 bg-foreground group-data-[orientation=vertical]/tabs:inset-x-auto group-data-[orientation=vertical]/tabs:inset-y-0 group-data-[orientation=vertical]/tabs:right-0 group-data-[orientation=vertical]/tabs:h-auto group-data-[orientation=vertical]/tabs:w-0.5",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

/** One tab. Its `value` matches the `TabsContent` it shows. */
function TabsTrigger({
	className,
	children,
	onPointerDown,
	onKeyDown,
	onBlur,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	const { value, indicatorId } = React.useContext(TabsContext);
	const { variant, size, baseline } = React.useContext(TabsListContext);
	const { resolve } = useMotionPreference();
	const isActive = value === props.value;
	/*
	 * Radix focuses the tab from script on mouse down, which the browser counts as
	 * keyboard focus (`:focus-visible`). Track pointer focus so the ring shows only
	 * when the tab was reached with the keyboard.
	 */
	const [focusedByPointer, setFocusedByPointer] = React.useState(false);

	return (
		<TabsPrimitive.Trigger
			data-slot='tabs-trigger'
			data-focus-source={focusedByPointer ? "pointer" : undefined}
			className={cn(
				tabsTriggerVariants({
					variant,
					size,
					baseline: variant === "line" && baseline,
				}),
				!focusedByPointer &&
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
			onPointerDown={(event) => {
				setFocusedByPointer(true);
				onPointerDown?.(event);
			}}
			onKeyDown={(event) => {
				setFocusedByPointer(false);
				onKeyDown?.(event);
			}}
			onBlur={(event) => {
				setFocusedByPointer(false);
				onBlur?.(event);
			}}
			{...props}
		>
			{isActive && (
				<motion.span
					aria-hidden='true'
					data-slot='tabs-indicator'
					layoutId={`${indicatorId}-indicator`}
					transition={resolve(layoutSpring)}
					className={tabsIndicatorVariants({ variant })}
				/>
			)}
			{children}
		</TabsPrimitive.Trigger>
	);
}

/* -------------------------------------------------------------------------- */
/* TabsContent                                                                */
/* -------------------------------------------------------------------------- */

/** The panel shown while its tab is active. */
function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot='tabs-content'
			className={cn(
				"flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	tabsListVariants,
	tabsTriggerVariants,
	type TabsListProps,
};
