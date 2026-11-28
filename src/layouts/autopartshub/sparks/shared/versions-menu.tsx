import { ChevronDown } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/overlays/dropdown-menu";
import { cn } from "@/lib/utils";

/*
 * The prototype's title as its menu (prds/sparks-prototype.md, "Versions", "Paths"): the direction's name with a
 * chevron, "Version {n}" under it (with when it was published, once it is). The menu lists the paths built (with more than one) and every version, newest first,
 * each named for what changed: the current one marked "Current", every other with "Restore", which saves it again as the
 * newest.
 */

type VersionsMenuProps = {
	/** The direction shown, by its name alone ("Fit check before you buy"): it's the idea, not a card in a list. */
	title: string;
	/**
	 * Every version, oldest first; the last is the current one. `number` and `publishedAt` (ISO): for the versions a reviewer
	 * can open, which skip the ones never published.
	 */
	versions: { id: string; name: string; number?: number; publishedAt?: string }[];
	onRestore?: (id: string) => void;
	/**
	 * Viewing, not restoring (the reviewers' page): the version shown (`viewing`, an id) and `onView` to open another. The
	 * menu lists them as choices, a check on the one shown, "Latest" on the newest; no "Restore".
	 */
	viewing?: string;
	onView?: (id: string) => void;
	/** The paths built, in the order built; with more than one, the menu switches between them. */
	paths?: { id: string; label: string }[];
	/** The path shown. */
	path?: string;
	onPathChange?: (id: string) => void;
	/** Published: the version the teams see and when (an ISO timestamp), shown after the version, e.g. "Version 2 · Published Nov 26, 2026, 2:40 PM". */
	published?: { version: number; at: string };
	/**
	 * `name` (default): the title is the menu, "Version {n}" (and when it was published) under it. `version`: "Version {n}" is
	 * the menu, and under it when it was published, or "Not published yet" (Review, where the idea's panel has the name).
	 */
	shows?: "name" | "version";
	/** `base` (default): the prototype's toolbar. `xl`: the idea's panel heading in Review (xl semibold, `foreground`), a 20px chevron. */
	size?: "base" | "xl";
};

/** When it was published, as a date and time: "Nov 26, 2026, 2:40 PM". */
const publishedFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

/** The "Restore" on a version: drawn as a small outlined button; the whole row is what's selected. */
const restoreClasses =
	"inline-flex h-7 shrink-0 items-center rounded-button-md border border-input bg-background px-2.5 text-sm font-medium text-foreground shadow-xs";

/**
 * The title, a menu trigger: base semibold `foreground-prominent` with a 16px chevron 4px after it (as the concept's name
 * in the header), and "Version {n}" under it, 12px `muted-foreground`. With one path and no versions, it's the title alone.
 */
function VersionsMenu({
	title,
	versions,
	onRestore,
	viewing,
	onView,
	paths = [],
	path,
	onPathChange,
	published,
	shows = "name",
	size = "base",
}: VersionsMenuProps) {
	const newestFirst = [...versions].reverse();
	const switchesPaths = paths.length > 1;
	const numberOf = (index: number) => versions[index]?.number ?? index + 1;
	const viewed = onView ? versions.findIndex((v) => v.id === viewing) : -1;
	// The version shown: the one viewed, the newest, or, with no versions to choose from, the published one.
	const current = viewed >= 0 ? numberOf(viewed) : versions.length ? numberOf(versions.length - 1) : (published?.version ?? 0);
	const byVersion = shows === "version" && current > 0;
	const heading = (
		<span className={cn("truncate font-semibold", size === "xl" ? "text-xl text-foreground" : "text-base text-foreground-prominent")}>
			{byVersion ? `Version ${current}` : title}
		</span>
	);
	// When it was published, or, by version, that it isn't yet. If she's changed it since, which version the teams have.
	const when = published ? (
		<>
			{published.version === current ? "Published" : `Version ${published.version} published`}{" "}
			<time dateTime={published.at}>{publishedFormat.format(new Date(published.at))}</time>
		</>
	) : byVersion ? (
		"Not published yet"
	) : null;
	return (
		<div className='flex min-w-0 flex-col'>
			{versions.length || switchesPaths ? (
				<DropdownMenu>
					<h2 className='flex min-w-0'>
						<DropdownMenuTrigger asChild>
							<button
								type='button'
								title={title}
								aria-label={byVersion ? `Version ${current} of ${title}` : undefined}
								className='flex min-w-0 items-center gap-1 rounded-md text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
							>
								{heading}
								<ChevronDown aria-hidden className={cn("shrink-0 text-icon", size === "xl" ? "size-5" : "size-4")} />
							</button>
						</DropdownMenuTrigger>
					</h2>
					{/* 8px under "Version {n}" (its 18px line under the title), not over it. */}
					{/* 8px under the line under the title (26: past "Version {n}"); with no line, 8px under the title. */}
					<DropdownMenuContent align='start' sideOffset={versions.length ? 26 : 8} className='w-80'>
						{switchesPaths ? (
							<>
								<DropdownMenuLabel>Paths</DropdownMenuLabel>
								<DropdownMenuRadioGroup value={path} onValueChange={(id) => onPathChange?.(id)}>
									{paths.map((option) => (
										<DropdownMenuRadioItem key={option.id} value={option.id}>
											<span className='truncate'>{option.label}</span>
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
								{versions.length ? <DropdownMenuSeparator /> : null}
							</>
						) : null}
						{versions.length ? <DropdownMenuLabel>Versions, newest first</DropdownMenuLabel> : null}
						{onView ? (
							// Viewing: each version a choice, the one shown checked, the newest marked "Latest".
							<DropdownMenuRadioGroup value={viewing} onValueChange={onView}>
								{newestFirst.map((version, index) => (
									<DropdownMenuRadioItem key={version.id} value={version.id} className='h-auto'>
										<span className='flex min-w-0 flex-1 flex-col'>
											<span className='flex items-center justify-between gap-3'>
												<span className='truncate text-foreground' title={version.name}>
													{version.name}
												</span>
												{index === 0 ? <span className='shrink-0 text-xs font-normal text-muted-foreground'>Latest</span> : null}
											</span>
											<span className='text-xs font-normal text-muted-foreground'>
												Version {numberOf(versions.length - 1 - index)}
												{version.publishedAt ? ` · Published ${publishedFormat.format(new Date(version.publishedAt))}` : null}
											</span>
										</span>
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						) : null}
						{(onView ? [] : newestFirst).map((version, index) => {
							const number = versions.length - index;
							const name = (
								<span className='flex min-w-0 flex-col'>
									<span className='truncate text-foreground' title={version.name}>
										{version.name}
									</span>
									<span className='text-xs font-normal text-muted-foreground'>Version {number}</span>
								</span>
							);
							// The current one isn't an action: a row with the same spacing, marked "Current".
							return index === 0 ? (
								<div key={version.id} className='flex items-center justify-between gap-3 px-2 py-1.5 text-sm font-medium'>
									{name}
									<span className='shrink-0 text-xs font-normal text-muted-foreground'>Current</span>
								</div>
							) : (
								<DropdownMenuItem
									key={version.id}
									aria-label={`Restore version ${number}: ${version.name}`}
									className='h-auto justify-between gap-3'
									onSelect={() => onRestore?.(version.id)}
								>
									{name}
									<span aria-hidden className={restoreClasses}>
										Restore
									</span>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<h2 className='min-w-0 truncate text-base font-semibold text-foreground-prominent' title={title}>
					{byVersion ? `Version ${current}` : title}
				</h2>
			)}
			{byVersion ? (
				<p className='truncate text-xs text-muted-foreground'>{when}</p>
			) : versions.length ? (
				<p className='truncate text-xs text-muted-foreground'>
					Version {versions.length}
					{when ? <> · {when}</> : null}
				</p>
			) : null}
		</div>
	);
}

export { publishedFormat, VersionsMenu, type VersionsMenuProps };
