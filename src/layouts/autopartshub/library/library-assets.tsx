import * as React from "react";
import { FileText, Image, Link2, Search, Sheet, StickyNote } from "lucide-react";

import { formatRelativeDate } from "@/lib/relative-date";
import { cn } from "@/lib/utils";

/**
 * Something in "My library", Dana's across ideas (prds/autopartshub-home.md, "Knowledge and Connections"): a file, a link
 * or a note.
 */
type LibraryAsset = {
	id: string;
	kind: "file" | "link" | "note";
	/** The file's name, the link's address, or the note's text: what's kept with an idea it's added to. */
	label: string;
	/** A link's or a note's name; a file goes by its name. */
	title?: string;
	/** A file's size, as shown ("1.2 MB"). */
	size?: string;
	/** ISO date. */
	addedAt: string;
};

const extensionOf = (name: string) => (/\.([a-z0-9]+)$/i.exec(name)?.[1] ?? "").toLowerCase();

/** The icon of a file (by its type), a link or a note, wherever one is listed. */
const libraryIcon = ({ kind, label }: Pick<LibraryAsset, "kind" | "label">) => {
	if (kind === "link") return Link2;
	if (kind === "note") return StickyNote;
	const extension = extensionOf(label);
	if (/^(png|jpe?g|gif|webp|svg|heic)$/.test(extension)) return Image;
	if (/^(csv|xlsx?)$/.test(extension)) return Sheet;
	return FileText;
};

const assetName = (asset: Pick<LibraryAsset, "label" | "title">) => asset.title ?? asset.label.replace(/^https?:\/\//i, "");

/** What's under its name: a file's type and size, a link's address, the start of a note. */
const assetDetail = (asset: LibraryAsset) =>
	asset.kind === "file"
		? [extensionOf(asset.label).toUpperCase() || "File", asset.size].filter(Boolean).join(" · ")
		: asset.kind === "link"
			? asset.label.replace(/^https?:\/\//i, "")
			: asset.label;

const kindWords = { file: "file", link: "link", note: "note" } as const;

/** The assets that have every word typed, in their name, address, text or type ("pdf", "link"), in the same order. */
function searchAssets(assets: LibraryAsset[], query: string) {
	const words = query.toLowerCase().split(/\s+/).filter(Boolean);
	return assets.filter((asset) => {
		const text = `${assetName(asset)} ${assetDetail(asset)} ${asset.label} ${kindWords[asset.kind]}`.toLowerCase();
		return words.every((word) => text.includes(word));
	});
}

/** The search field over a list of assets: Share's field, with a search icon. */
function LibrarySearch({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
	return (
		<div
			className={cn(
				"flex h-9 shrink-0 items-center gap-2 rounded-input border border-input bg-background ps-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
				className,
			)}
		>
			<Search aria-hidden className='size-4 shrink-0 text-icon-muted' />
			<input
				type='search'
				aria-label='Search your library'
				placeholder='Search by name, type or content'
				autoComplete='off'
				className='h-full min-w-0 flex-1 bg-transparent pe-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle [&::-webkit-search-cancel-button]:hidden'
				{...props}
			/>
		</div>
	);
}

/** An asset in a list: its icon, its name, what's under it, and when it was added. */
function LibraryAssetInfo({ asset, now }: { asset: LibraryAsset; now?: number }) {
	const Icon = libraryIcon(asset);
	const time = formatRelativeDate(asset.addedAt, now);
	return (
		<>
			<span aria-hidden className='grid size-9 shrink-0 place-items-center rounded-lg bg-background-subtle'>
				<Icon className='size-4.5 text-icon' />
			</span>
			<span className='flex min-w-0 flex-1 flex-col'>
				<span className='truncate text-sm font-medium text-foreground'>{assetName(asset)}</span>
				<span className='truncate text-xs text-muted-foreground'>{assetDetail(asset)}</span>
			</span>
			<time dateTime={asset.addedAt} title={time.title} className='shrink-0 text-xs text-muted-foreground'>
				{time.label}
			</time>
		</>
	);
}

export { assetName, extensionOf, LibraryAssetInfo, libraryIcon, LibrarySearch, searchAssets, type LibraryAsset };
