export { cn } from "@/lib/utils";

export {
	formatRelativeDate,
	RELATIVE_CUTOVER,
	type RelativeDate,
} from "@/lib/relative-date";

export {
	motionDuration,
	motionDistance,
	motionScale,
	motionRotation,
	motionStagger,
	standardTransition,
	enterTransition,
	exitTransition,
	subtleSpring,
	responsiveSpring,
	layoutSpring,
	fadeVariants,
	rowRemoveVariants,
	revealVariants,
	expandVariants,
	dismissVariants,
	overlayVariants,
	panelVariants,
	slideVariants,
	staggerContainerVariants,
	pendingIconVariants,
	pendingIconReducedVariants,
	pendingSurfaceVariants,
	liftPattern,
	pressPattern,
	mediaHoverPattern,
	liftWithMediaPattern,
	glidePattern,
	confirmPattern,
	reducedMotionTransition,
	resolveTransition,
	useMotionPreference,
	useExpandClip,
} from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Brand                                                                      */
/* -------------------------------------------------------------------------- */

export {
	AutoPartsHubLogo,
	autoPartsHubLogoVariants,
	type AutoPartsHubLogoProps,
} from "@/components/brand/autoparts-hub-logo";
export { CareLogo, type CareLogoProps } from "@/components/brand/care-logo";
export { FlowLogo, type FlowLogoProps } from "@/components/brand/flow-logo";
export { Logo, logoVariants, type LogoProps } from "@/components/brand/logo";
export { PulseLogo, type PulseLogoProps } from "@/components/brand/pulse-logo";
export { SalesLogo, type SalesLogoProps } from "@/components/brand/sales-logo";

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

export {
	Button,
	buttonVariants,
	type ButtonProps,
} from "@/components/buttons/button";

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

export { AppCard, type AppCardProps } from "@/components/cards/app-card";

/* -------------------------------------------------------------------------- */
/* Data display                                                               */
/* -------------------------------------------------------------------------- */

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarBadge,
	AvatarAdd,
	avatarVariants,
	avatarColors,
	avatarColorFor,
	type AvatarProps,
	type AvatarFallbackProps,
	type AvatarAddProps,
	type AvatarColor,
} from "@/components/data-display/avatar";

/* -------------------------------------------------------------------------- */
/* Feedback                                                                   */
/* -------------------------------------------------------------------------- */

export { EmptyState, type EmptyStateProps } from "@/components/feedback/empty-state";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export { AppHeader, type AppHeaderProps } from "@/components/navigation/app-header";
export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	tabsListVariants,
	tabsTriggerVariants,
	type TabsListProps,
} from "@/components/navigation/tabs";

/* -------------------------------------------------------------------------- */
/* Typography                                                                 */
/* -------------------------------------------------------------------------- */

export {
	Typography,
	typographyVariants,
	typographyHeadings,
	type TypographyHeading,
	type TypographyProps,
	type TypographySize,
	type TypographyWeight,
} from "@/components/typography/typography";
