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
export { AutoPartsLogo, autoPartsLogoVariants, type AutoPartsLogoProps } from "@/components/brand/autoparts-logo";
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
/* Forms                                                                      */
/* -------------------------------------------------------------------------- */

export { Checkbox } from "@/components/forms/checkbox";
export { handlePeopleKeys, matchPeople, PeopleAvatar, PeopleList, type PeopleOption } from "@/components/forms/people-list";
export { RadioGroup, RadioGroupItem } from "@/components/forms/radio-group";
export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/forms/select";

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

export { AppCard, type AppCardProps } from "@/components/cards/app-card";

/* -------------------------------------------------------------------------- */
/* Chat                                                                       */
/* -------------------------------------------------------------------------- */

export { ActivityFeed, type ActivityFeedProps } from "@/components/chat/activity-feed";
export { AssistantMessage, type AssistantMessageProps } from "@/components/chat/assistant-message";
export {
	ClarificationCard,
	type ClarificationCardProps,
} from "@/components/chat/clarification-card";
export {
	DirectionCard,
	directionCardVariants,
	type DirectionCardLine,
	type DirectionCardProps,
	type DirectionCardRating,
} from "@/components/chat/direction-card";
export { PromptComposer, type PromptComposerProps } from "@/components/chat/prompt-composer";
export { QuickReplies, type QuickRepliesProps } from "@/components/chat/quick-replies";
export { ReplyOptions, type ReplyOption, type ReplyOptionsProps } from "@/components/chat/reply-options";
export { SectionDivider, type SectionDividerProps } from "@/components/chat/section-divider";
export { ThinkingIndicator, type ThinkingIndicatorProps } from "@/components/chat/thinking-indicator";
export { UserMessage, type UserMessageProps } from "@/components/chat/user-message";

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
export { Badge, badgeVariants, type BadgeProps } from "@/components/data-display/badge";
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/data-display/table";
export { TeamAssessment, teamAssessmentVariants, type TeamAssessmentAction, type TeamAssessmentOutcome, type TeamAssessmentPerson, type TeamAssessmentProps } from "@/components/data-display/team-assessment";

/* -------------------------------------------------------------------------- */
/* Feedback                                                                   */
/* -------------------------------------------------------------------------- */

export { EmptyState, type EmptyStateProps } from "@/components/feedback/empty-state";
export { InlineAlert, inlineAlertVariants, type InlineAlertProps, type InlineAlertTone } from "@/components/feedback/inline-alert";

/* -------------------------------------------------------------------------- */
/* Overlays                                                                   */
/* -------------------------------------------------------------------------- */

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "@/components/overlays/dropdown-menu";
export {
	Dialog,
	DialogTrigger,
	DialogPortal,
	DialogClose,
	DialogOverlay,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from "@/components/overlays/dialog";
export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverAnchor,
	PopoverHeader,
	PopoverTitle,
	PopoverDescription,
} from "@/components/overlays/popover";
export { PublishItems, PublishPopover, type PublishItem, type PublishPath, type PublishPopoverProps } from "@/components/overlays/publish-popover";
export {
	SharePopover,
	shareRoles,
	type ShareMember,
	type SharePopoverProps,
	type ShareRole,
	type ShareSuggestion,
	type ShareTeamPerson,
} from "@/components/overlays/share-popover";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/overlays/tooltip";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export { AppHeader, type AppHeaderProps } from "@/components/navigation/app-header";
export {
	StepNav,
	StepNavItem,
	type StepNavProps,
	type StepNavItemProps,
} from "@/components/navigation/step-nav";
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
