import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Folder, MessageCircle, Paperclip, Zap } from "lucide-react";

import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/overlays/dropdown-menu";

import { PromptComposer } from "./prompt-composer";

const meta = {
	title: "Chat/PromptComposer",
	component: PromptComposer,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className='w-[678px] max-w-full'>
				<Story />
			</div>
		),
	],
	args: {
		placeholder: "Message Sparks…",
		"aria-label": "Message Sparks",
		onSubmit: fn(),
		onAttach: fn(),
		onDictate: fn(),
		onVoice: fn(),
	},
} satisfies Meta<typeof PromptComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Default": empty, accent border at 20%, the main button starts a voice conversation. Type to see it become Send. */
export const Default: Story = {};

/** Figma "HasValue": text in the box, full accent border, the main button sends. */
export const HasValue: Story = {
	args: { defaultValue: "abc" },
};

/** Long text grows the box, up to 240px, then scrolls. */
export const LongText: Story = {
	args: {
		defaultValue:
			"Too many customers buy parts that don't fit their car. They bring them back to the store, call to ask which one is right, and some just go to a competitor.\n\nI think it's worse for older vehicles, where the catalog's fit data has gaps.",
	},
};

/** A suggested answer as the placeholder, with how to take it: Tab puts it in the box to edit. */
export const WithSuggestion: Story = {
	args: {
		suggestion: "Do-it-yourself customers buying online, most often for vehicles more than 10 years old.",
		autoFocus: true,
	},
};

/** With a way back: Esc cancels (e.g. answering in her own words after "Not quite"), and the hint says so. */
export const WithSuggestionAndCancel: Story = {
	args: {
		suggestion: "Do-it-yourself customers buying online, most often for vehicles more than 10 years old.",
		onCancel: fn(),
		autoFocus: true,
	},
};

/** Files attached to the message, above the text. The main button is Send: they can go with no text. */
export const WithAttachments: Story = {
	args: {
		attachments: ["returns-report-q3.pdf", "store-calls-october.xlsx"],
		onAttachmentRemove: fn(),
	},
};

/** "+" opens a menu (sparks.ds "select-prompt-add", 77:6726): attach files, add from the library, add a connection, the initial prompt. */
export const WithAddMenu: Story = {
	args: {
		addMenu: (
			<>
				<DropdownMenuItem>
					<Paperclip aria-hidden />
					Attach files
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Folder aria-hidden />
					Add from library
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Zap aria-hidden />
					Add a connection
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<MessageCircle aria-hidden />
					Initial prompt
				</DropdownMenuItem>
			</>
		),
	},
};

/** Disabled: nothing can be typed, attached, dictated or sent. */
export const Disabled: Story = {
	args: { disabled: true },
};

export const AllVariants: Story = {
	render: (args) => (
		<div className='flex flex-col gap-6'>
			<PromptComposer {...args} />
			<PromptComposer {...args} defaultValue='abc' />
			<PromptComposer {...args} disabled />
		</div>
	),
};
