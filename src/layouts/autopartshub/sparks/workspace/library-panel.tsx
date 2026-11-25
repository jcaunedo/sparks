import * as React from "react";
import { Paperclip, Trash2 } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/overlays/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";
import { cn } from "@/lib/utils";

import { extensionOf, libraryIcon } from "../../library/library-assets";
import { SidePanel, sidePanelButtonClasses } from "./side-panel";

/** Something Dana gave this idea: a file she attached, a link, or notes she typed to support it. */
type LibraryItem = {
	id: string;
	kind: "file" | "link" | "note";
	/** The file's name, the link's address, or the notes. */
	label: string;
	/** Its name, for a link or a note added from My library. */
	title?: string;
	/** The live app the idea improves: an answer in Plan, changed there, so it has no "Remove" here. */
	app?: boolean;
};

type LibraryPanelProps = {
	items: LibraryItem[];
	/** Files picked or a link typed in the panel, and "Undo" after removing one. */
	onAdd: (items: Pick<LibraryItem, "kind" | "label" | "title">[]) => void;
	onRemove: (id: string) => void;
	/** The images that can be opened, by file name: their address. */
	images?: Record<string, string>;
	/** The files picked with "Add files", before they're added, e.g. to keep the images. */
	onFilesPicked?: (files: File[]) => void;
	onClose: () => void;
	autoFocus?: boolean;
	className?: string;
};

/** What can be attached (prds/sparks-plan-problem.md, "Describing the problem"): documents, PDFs, spreadsheets, images. */
const attachTypes = ".pdf,.doc,.docx,.txt,.md,.rtf,.csv,.xls,.xlsx,.ppt,.pptx,image/*";

/** A web address as typed ("autoparts.example/report" too), as a full one; nothing if it isn't one. */
function linkFrom(text: string) {
	const value = text.trim();
	if (!/^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+([/?#]\S*)?$/i.test(value)) return undefined;
	return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

/** What opens something: the link style, wrapping. */
const opensClasses = "rounded-sm text-left text-sm font-medium break-words text-link outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring";

/** An image's name, which opens it in a dialog, as large as the window allows, with its name on top. */
function ImageDialog({ name, src }: { name: string; src: string }) {
	const [broken, setBroken] = React.useState(false);
	return (
		<Dialog>
			<DialogTrigger className={opensClasses}>
				{name}
				<span className='sr-only'> (opens the image)</span>
			</DialogTrigger>
			{/* `w-max`, not `w-fit`: placed from the middle (`left-1/2`), `w-fit` would stop at half the window. */}
			<DialogContent aria-describedby={undefined} className='w-max min-w-[min(480px,calc(100%-4rem))] max-w-[calc(100%-4rem)] grid-cols-[minmax(0,1fr)] sm:max-w-[calc(100%-4rem)]'>
				{/* The image sets the width: a long name is cut, it doesn't widen the dialog. */}
				<DialogHeader className='w-0 min-w-full'>
					<DialogTitle className='truncate'>{name}</DialogTitle>
				</DialogHeader>
				{broken ? (
					<p className='text-sm text-muted-foreground'>This image can't be shown here.</p>
				) : (
					<img src={src} alt={name} onError={() => setBroken(true)} className='mx-auto max-h-[calc(100vh-11rem)] max-w-full min-w-0 rounded-lg object-contain' />
				)}
			</DialogContent>
		</Dialog>
	);
}

/** One item: its icon, what it is, and "Remove" (not on the app, which is an answer in Plan). A link opens in its own tab, an image (`src`) in a dialog. */
function LibraryRow({ item, src, onRemove }: { item: LibraryItem; src?: string; onRemove: (item: LibraryItem) => void }) {
	const Icon = libraryIcon(item);
	const detail = item.app ? "The app this improves. Change it in Plan." : item.kind === "file" ? extensionOf(item.label).toUpperCase() || "File" : item.title ? item.label.replace(/^https?:\/\//i, "") : undefined;
	const remove = `Remove ${item.title ?? (item.kind === "note" ? "note" : item.label)}`;
	return (
		<li className='flex items-start gap-3 py-1.5'>
			<Icon aria-hidden className='mt-2.5 size-4 shrink-0 text-icon-muted' />
			<div className='flex min-h-9 min-w-0 flex-1 flex-col justify-center'>
				{item.kind === "link" ? (
					<a
						href={item.label}
						target='_blank'
						rel='noreferrer'
						className={opensClasses}
					>
						{item.title ?? item.label.replace(/^https?:\/\//i, "")}
						<span className='sr-only'> (opens in a new tab)</span>
					</a>
				) : src ? (
					<ImageDialog name={item.label} src={src} />
				) : item.title ? (
					<span className='text-sm font-medium break-words text-foreground'>{item.title}</span>
				) : (
					<span className={cn("text-sm break-words text-foreground", item.kind === "file" ? "font-medium" : "whitespace-pre-line")}>{item.label}</span>
				)}
				{detail ? <span className='text-xs text-muted-foreground'>{detail}</span> : null}
			</div>
			{item.app ? null : (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant='ghost' size='icon' aria-label={remove} className={cn("shrink-0", sidePanelButtonClasses)} onClick={() => onRemove(item)}>
							<Trash2 aria-hidden />
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom' sideOffset={6}>
						Remove
					</TooltipContent>
				</Tooltip>
			)}
		</li>
	);
}

const sections = [
	{ kind: "file", title: "Files" },
	{ kind: "link", title: "Links" },
	{ kind: "note", title: "Notes" },
] as const;

/**
 * "Library" (prds/sparks.md, "The idea's library"): everything Dana gave this idea, in the same column as Comments
 * (`SidePanel`): "Add files" and a field for a link on top, then her files, links and notes, each with "Remove" (with
 * "Undo" after). Not in Figma yet, except the folder in the header (sparks.ds 77:6793).
 */
function LibraryPanel({ items, onAdd, onRemove, images = {}, onFilesPicked, onClose, autoFocus, className }: LibraryPanelProps) {
	const inputId = React.useId();
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const undoRef = React.useRef<HTMLButtonElement>(null);
	const linkRef = React.useRef<HTMLInputElement>(null);
	const addRef = React.useRef<HTMLButtonElement>(null);
	const [value, setValue] = React.useState("");
	const [removed, setRemoved] = React.useState<LibraryItem>();
	const link = linkFrom(value);

	const add = (added: Pick<LibraryItem, "kind" | "label" | "title">[]) => {
		setRemoved(undefined);
		onAdd(added);
	};
	// The row goes, and focus with it: "Undo" takes it.
	React.useEffect(() => {
		if (removed) undoRef.current?.focus();
	}, [removed]);

	return (
		<SidePanel title='Library' closeLabel='Close library' onClose={onClose} autoFocus={autoFocus} className={className} bodyClassName='gap-6'>
			<div className='flex flex-col gap-3'>
				<p className='text-sm text-muted-foreground'>What you've added to this idea. Sparks keeps it marked as yours.</p>
				<input
					ref={fileInputRef}
					type='file'
					multiple
					accept={attachTypes}
					aria-label='Add files to the library'
					tabIndex={-1}
					className='hidden'
					onChange={(event) => {
						const picked = [...(event.target.files ?? [])];
						onFilesPicked?.(picked);
						const names = picked.map((file) => file.name);
						// Cleared, so the same file can be picked again after it's removed.
						event.target.value = "";
						if (names.length) add(names.map((label) => ({ kind: "file", label })));
					}}
				/>
				<Button ref={addRef} variant='outline' className='w-fit' onClick={() => fileInputRef.current?.click()}>
					<Paperclip aria-hidden data-icon='inline-start' /> Add files
				</Button>
				<form
					className='flex gap-2'
					onSubmit={(event) => {
						event.preventDefault();
						if (!link) return;
						add([{ kind: "link", label: link }]);
						setValue("");
						// "Add" goes: focus stays in the field, for another.
						linkRef.current?.focus();
					}}
				>
					<label htmlFor={inputId} className='sr-only'>
						Link
					</label>
					{/* The same field as Share's. "Add" only once what she's typed is a link, as "Invite" there. */}
					<div className='flex h-9 min-w-0 flex-1 items-center rounded-input border border-input bg-background focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30'>
						<input
							ref={linkRef}
							id={inputId}
							value={value}
							onChange={(event) => setValue(event.target.value)}
							placeholder='Paste a link'
							autoComplete='off'
							inputMode='url'
							className='h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle'
						/>
					</div>
					{link ? (
						<Button type='submit' variant='neutral'>
							Add
						</Button>
					) : null}
				</form>
				<div role='status' className='empty:-mt-3'>
					{removed ? (
						<p className='flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground'>
							<span className='min-w-0 truncate'>Removed {removed.title ? `"${removed.title}"` : removed.kind === "note" ? "your note" : `"${removed.label.replace(/^https?:\/\//i, "")}"`}.</span>
							<Button
								ref={undoRef}
								variant='link'
								className='h-auto shrink-0 p-0 font-semibold text-link'
								onClick={() => {
									add([{ kind: removed.kind, label: removed.label, title: removed.title }]);
									addRef.current?.focus();
								}}
							>
								Undo
							</Button>
						</p>
					) : null}
				</div>
			</div>
			{sections.map(({ kind, title }) => {
				const shown = items.filter((item) => item.kind === kind);
				if (!shown.length) return null;
				const titleId = `${inputId}-${kind}`;
				return (
					<section key={kind} aria-labelledby={titleId} className='flex flex-col gap-2 border-t border-border pt-6'>
						<h3 id={titleId} className='text-lg font-semibold text-foreground'>
							{title}
						</h3>
						<ul className='flex flex-col'>
							{shown.map((item) => (
								<LibraryRow
									key={item.id}
									item={item}
									src={item.kind === "file" ? images[item.label] : undefined}
									onRemove={(gone) => {
										setRemoved(gone);
										onRemove(gone.id);
									}}
								/>
							))}
						</ul>
					</section>
				);
			})}
			{items.length ? null : <p className='border-t border-border pt-6 text-sm text-muted-foreground'>Nothing here yet. Files, links and notes you give Sparks show up here, or add them above.</p>}
		</SidePanel>
	);
}

export { attachTypes, LibraryPanel, type LibraryItem, type LibraryPanelProps };
