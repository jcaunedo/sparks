import * as React from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/buttons/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/overlays/dialog";
import { cn } from "@/lib/utils";

import { assetName, LibraryAssetInfo, LibrarySearch, searchAssets, type LibraryAsset } from "../../library/library-assets";
import type { LibraryItem } from "./library-panel";

/** Something picked: what it is, and the name it goes by. */
type LibraryPick = Pick<LibraryAsset, "kind" | "label" | "title">;

type LibraryDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	/** "My library", newest first. */
	assets: LibraryAsset[];
	/** What's in the idea's library already: those can't be picked again. */
	items: LibraryItem[];
	onAdd: (items: LibraryPick[]) => void;
	/** The clock the times are counted from (stories pin it); defaults to now. */
	now?: number;
	/** Where focus goes when it closes. */
	onCloseAutoFocus?: (event: Event) => void;
};

/**
 * "Add from library" (prds/sparks.md, "Adding from My library"): everything in My library, in a dialog, to search and add
 * to the idea. Pick as many as she wants, also across searches; what's in the idea already shows "Added". Not in Figma yet.
 */
function LibraryDialog({ open, onOpenChange, onCloseAutoFocus, ...props }: LibraryDialogProps) {
	const searchRef = React.useRef<HTMLInputElement>(null);
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className='flex max-h-[calc(100vh-4rem)] flex-col gap-4 sm:max-w-[640px]'
				onOpenAutoFocus={(event) => {
					event.preventDefault();
					searchRef.current?.focus();
				}}
				onCloseAutoFocus={onCloseAutoFocus}
			>
				{/* Its own component, so each time it opens it starts over: nothing typed, nothing picked. */}
				<LibraryPicker {...props} searchRef={searchRef} onDone={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	);
}

function LibraryPicker({
	assets,
	items,
	onAdd,
	now,
	searchRef,
	onDone,
}: Pick<LibraryDialogProps, "assets" | "items" | "onAdd" | "now"> & { searchRef: React.RefObject<HTMLInputElement | null>; onDone: () => void }) {
	const [query, setQuery] = React.useState("");
	const [picked, setPicked] = React.useState<string[]>([]);
	const shown = searchAssets(assets, query);
	const isAdded = (asset: LibraryAsset) => items.some((item) => item.kind === asset.kind && item.label === asset.label);
	const toggle = (id: string) => setPicked((current) => (current.includes(id) ? current.filter((other) => other !== id) : [...current, id]));
	const add = () => {
		if (!picked.length) return;
		// In the list's order.
		onAdd(assets.filter((asset) => picked.includes(asset.id)).map(({ kind, label, title }) => ({ kind, label, title })));
		onDone();
	};

	return (
		<form
			className='flex min-h-0 flex-1 flex-col gap-4'
			onSubmit={(event) => {
				event.preventDefault();
				add();
			}}
		>
			<DialogHeader>
				<DialogTitle>Add from library</DialogTitle>
				<DialogDescription>Pick files, links and notes from My library to add to this idea. Sparks keeps them marked as yours.</DialogDescription>
			</DialogHeader>
			{assets.length ? <LibrarySearch ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} /> : null}
			{/* A fixed height, so the dialog doesn't jump as she searches; -mx/px: the rows' hover reaches past the text. */}
			<div className='-mx-2 flex h-[392px] min-h-0 flex-col overflow-y-auto px-2'>
				{shown.length ? (
					<ul aria-label='My library' className='flex flex-col gap-0.5'>
						{shown.map((asset) => {
							const added = isAdded(asset);
							const selected = picked.includes(asset.id);
							return (
								<li key={asset.id}>
									<label
										className={cn(
											"-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-inset",
											!added && "cursor-pointer hover:bg-accent",
											selected && "bg-accent",
										)}
									>
										<input
											type='checkbox'
											aria-label={added ? `${assetName(asset)}, in this idea already` : assetName(asset)}
											checked={added || selected}
											disabled={added}
											onChange={() => toggle(asset.id)}
											className='size-4 shrink-0 accent-neutral outline-none'
										/>
										<LibraryAssetInfo asset={asset} now={now} />
										{added ? (
											<span aria-hidden className='flex shrink-0 items-center gap-1 text-xs text-success'>
												<Check className='size-3.5' />
												Added
											</span>
										) : null}
									</label>
								</li>
							);
						})}
					</ul>
				) : assets.length ? (
					<EmptyState
						className='flex-1'
						title={`Nothing matches "${query.trim()}"`}
						description='Try another word, or a type such as "pdf" or "note".'
						secondaryButtonLabel='Clear search'
						secondaryButtonProps={{
							type: "button",
							onClick: () => {
								setQuery("");
								searchRef.current?.focus();
							},
						}}
					/>
				) : (
					<EmptyState className='flex-1' title='Nothing in your library yet' description='Files, notes and research you add will show up here.' />
				)}
			</div>
			<div className='flex items-center justify-between gap-3'>
				<p role='status' className='text-sm text-muted-foreground'>
					{picked.length ? `${picked.length} selected` : ""}
				</p>
				<div className='flex gap-2'>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button type='submit' variant='neutral' disabled={!picked.length}>
						Add to idea
					</Button>
				</div>
			</div>
		</form>
	);
}

export { LibraryDialog, type LibraryDialogProps, type LibraryPick };
