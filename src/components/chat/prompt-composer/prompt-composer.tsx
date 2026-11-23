import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, AudioLines, Mic, Plus } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/overlays/dropdown-menu";
import {
	iconSwapReducedVariants,
	iconSwapVariants,
	pressPattern,
	useMotionPreference,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);

// Figma "Add Button" and the mic "Button": 36px round ghost buttons with an 18px icon.
const toolButtonClasses = "rounded-full text-icon [&_svg]:size-[18px]";

type PromptComposerProps = Omit<React.ComponentProps<"textarea">, "onSubmit"> & {
	/** Called with the text when the user sends it (the send button, or Enter without Shift). */
	onSubmit?: (value: string) => void;
	/** The "+" button: attach files. */
	onAttach?: () => void;
	/**
	 * The "+" button's menu: `DropdownMenuItem`s (and `DropdownMenuSeparator`s), e.g. sparks.ds "select-prompt-add" (77:6726:
	 * Attach, Add from library, Connect, Initial prompt). With it, "+" opens the menu instead of calling `onAttach`.
	 */
	addMenu?: React.ReactNode;
	/** The mic button: dictate into the box. */
	onDictate?: () => void;
	/** The main button while the box is empty: start a voice conversation. */
	onVoice?: () => void;
	/**
	 * A suggested answer: shown as the placeholder while the box is empty, with a hint; Tab puts it in the box to edit
	 * instead of typing it again. Uncontrolled, the box fills itself; controlled, handle `onSuggestionAccept`.
	 */
	suggestion?: string;
	/** Tab took the suggestion, with its text. */
	onSuggestionAccept?: (suggestion: string) => void;
	/**
	 * Esc in the box: leave what the box was opened for (e.g. answering a question in her own words) and go back to the
	 * state before it. Uncontrolled, the box clears itself, as Esc on an edit drops it. The hint says so while a suggestion
	 * is on offer.
	 */
	onCancel?: () => void;
};

/** A key named in the hint. */
function Key({ children }: { children: React.ReactNode }) {
	return (
		<kbd className='rounded-sm border border-border bg-background-subtle px-1 py-px font-sans text-[11px] text-foreground'>
			{children}
		</kbd>
	);
}

/**
 * A message box with attach, dictate and a main button that starts a voice conversation
 * while it's empty and becomes Send once there's text. Figma sparks.ds → "prompt-composer"
 * (set 39:1840: Default 39:1839, HasValue 39:1877).
 * `className` styles the frame; every other prop goes to the textarea.
 */
function PromptComposer({
	className,
	value,
	defaultValue,
	onChange,
	onKeyDown,
	onSubmit,
	onAttach,
	addMenu,
	onDictate,
	onVoice,
	suggestion,
	onSuggestionAccept,
	onCancel,
	placeholder,
	disabled,
	ref,
	...props
}: PromptComposerProps) {
	const { prefersReducedMotion, resolve } = useMotionPreference();
	const isControlled = value !== undefined;
	const [innerValue, setInnerValue] = React.useState(String(defaultValue ?? ""));
	const currentValue = isControlled ? String(value) : innerValue;
	const hasValue = currentValue.trim().length > 0;
	const swapVariants = prefersReducedMotion ? iconSwapReducedVariants : iconSwapVariants;
	const hintId = React.useId();
	const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
	// The suggestion is on offer while the box is empty.
	const offering = Boolean(suggestion) && !hasValue && !disabled;

	// Tab took the suggestion: the caret goes to its end, ready to edit.
	const acceptSuggestion = () => {
		if (!suggestion) return;
		if (!isControlled) setInnerValue(suggestion);
		onSuggestionAccept?.(suggestion);
		requestAnimationFrame(() => {
			const input = inputRef.current;
			if (input) input.setSelectionRange(input.value.length, input.value.length);
		});
	};

	const submit = () => {
		if (!hasValue || disabled) return;
		onSubmit?.(currentValue);
		if (!isControlled) setInnerValue("");
	};

	return (
		<div
			data-slot='prompt-composer'
			data-has-value={hasValue}
			className={cn(
				// Figma frame: background, 20px radius, no gap between the input and the controls, 14px padding measured from
				// the outer edge (Figma's stroke sits inside it), 112px tall in both states.
				"flex w-full flex-col justify-end gap-0 overflow-clip rounded-composer bg-background transition-colors",
				// Figma "Default": a 1px colors/border/defined border (1 + 13px padding = 14px), with a soft shadow.
				"border border-border-defined p-[13px] shadow-composer",
				// Figma "HasValue" (and focus, so keyboard users see where they are): a 2px accent border (2 + 12px = 14px, so
				// nothing moves); HasValue drops the shadow.
				"focus-within:border-2 focus-within:border-sparks-accent focus-within:p-3",
				"data-[has-value=true]:border-2 data-[has-value=true]:border-sparks-accent data-[has-value=true]:p-3 data-[has-value=true]:shadow-none",
				className,
			)}
		>
			{/* Figma "input": min 48px tall, 5px side inset; grows with its content. */}
			<textarea
				data-slot='prompt-composer-input'
				ref={(element) => {
					inputRef.current = element;
					if (typeof ref === "function") ref(element);
					else if (ref) ref.current = element;
				}}
				placeholder={offering ? suggestion : placeholder}
				aria-describedby={offering ? hintId : undefined}
				value={isControlled ? value : innerValue}
				onChange={(event) => {
					if (!isControlled) setInnerValue(event.target.value);
					onChange?.(event);
				}}
				onKeyDown={(event) => {
					onKeyDown?.(event);
					if (event.defaultPrevented) return;
					// Tab while the box is empty takes the suggestion (Shift+Tab still moves focus back).
					if (offering && event.key === "Tab" && !event.shiftKey) {
						event.preventDefault();
						acceptSuggestion();
						return;
					}
					// Esc cancels what the box was opened for, dropping what was typed. Never while an IME is composing.
					if (onCancel && event.key === "Escape" && !event.nativeEvent.isComposing) {
						event.preventDefault();
						if (!isControlled) setInnerValue("");
						onCancel();
						return;
					}
					// Enter sends; Shift+Enter adds a line. Never while an IME is composing.
					if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
						event.preventDefault();
						submit();
					}
				}}
				disabled={disabled}
				rows={2}
				className='field-sizing-content max-h-60 min-h-12 w-full resize-none bg-transparent px-[5px] text-base text-foreground outline-none placeholder:text-foreground-subtle disabled:cursor-not-allowed'
				{...props}
			/>

			{/* Figma "Controls": "+" on the left; mic and the main button on the right, 12px apart. */}
			<div data-slot='prompt-composer-controls' className='flex items-center justify-between'>
				{addMenu ? (
					// sparks.ds "select-prompt-add": the Select panel, opening above "+", from its left edge.
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								aria-label='Add to message'
								className={cn(toolButtonClasses, "data-[state=open]:bg-accent")}
								disabled={disabled}
							>
								<Plus aria-hidden />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='top'
							align='start'
							sideOffset={8}
							// Closing it, she's back to her message: focus goes to the box, caret at the end, not to "+".
							onCloseAutoFocus={(event) => {
								event.preventDefault();
								const input = inputRef.current;
								if (!input) return;
								input.focus();
								input.setSelectionRange(input.value.length, input.value.length);
							}}
						>
							{addMenu}
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Button
						type='button'
						variant='ghost'
						size='icon'
						aria-label='Attach files'
						className={toolButtonClasses}
						onClick={onAttach}
						disabled={disabled}
					>
						<Plus aria-hidden />
					</Button>
				)}

				{/* While a suggestion is on offer: how to take it, and how to cancel. Read with the box (aria-describedby). */}
				{offering ? (
					<span id={hintId} className='me-auto ms-2 text-xs text-muted-foreground'>
						Press <Key>Tab</Key> to edit this suggestion
						{onCancel ? (
							<>
								, <Key>Esc</Key> to cancel
							</>
						) : null}
					</span>
				) : null}

				<div className='flex items-center gap-3'>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						aria-label='Dictate'
						className={toolButtonClasses}
						onClick={onDictate}
						disabled={disabled}
					>
						<Mic aria-hidden />
					</Button>

					{/* Main button: voice while empty, Send once there's text. The icons overlap as they swap (MOTION.md: `iconSwapVariants`). */}
					<MotionButton
						type='button'
						size='icon'
						aria-label={hasValue ? "Send" : "Start voice conversation"}
						data-action={hasValue ? "send" : "voice"}
						className='relative rounded-full bg-[image:var(--gradient-sparks)] text-neutral-foreground transition-[filter] hover:brightness-95 [&_svg]:size-[18px]'
						onClick={hasValue ? submit : onVoice}
						disabled={disabled}
						whileTap={pressPattern.whileTap}
						transition={resolve(pressPattern.transition ?? {})}
					>
						<AnimatePresence initial={false}>
							<motion.span
								key={hasValue ? "send" : "voice"}
								className='absolute inset-0 grid place-items-center'
								variants={swapVariants}
								initial='hidden'
								animate='shown'
								exit='hidden'
							>
								{hasValue ? <ArrowUp aria-hidden /> : <AudioLines aria-hidden />}
							</motion.span>
						</AnimatePresence>
					</MotionButton>
				</div>
			</div>
		</div>
	);
}

export { PromptComposer, type PromptComposerProps };
