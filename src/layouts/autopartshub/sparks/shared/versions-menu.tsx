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

/*
 * The prototype's title as its menu (prds/sparks-prototype.md, "Versions", "Paths"): the direction's name with a
 * chevron, "Version {n}" under it. The menu lists the paths built (with more than one) and every version, newest first,
 * each named for what changed: the current one marked "Current", every other with "Restore", which saves it again as the
 * newest.
 */

type VersionsMenuProps = {
	/** The direction shown, numbered as on its card ("1. Fit check before you buy"). */
	title: string;
	/** Every version, oldest first; the last is the current one. */
	versions: { id: string; name: string }[];
	onRestore?: (id: string) => void;
	/** The paths built, in the order built; with more than one, the menu switches between them. */
	paths?: { id: string; label: string }[];
	/** The path shown. */
	path?: string;
	onPathChange?: (id: string) => void;
};

/** The "Restore" on a version: drawn as a small outlined button; the whole row is what's selected. */
const restoreClasses =
	"inline-flex h-7 shrink-0 items-center rounded-button-md border border-input bg-background px-2.5 text-sm font-medium text-foreground shadow-xs";

/**
 * The title, a menu trigger: base semibold `foreground-prominent` with a 16px chevron 4px after it (as the concept's name
 * in the header), and "Version {n}" under it, 12px `foreground-subtle`. With one path and no versions, it's the title alone.
 */
function VersionsMenu({ title, versions, onRestore, paths = [], path, onPathChange }: VersionsMenuProps) {
	const newestFirst = [...versions].reverse();
	const switchesPaths = paths.length > 1;
	const heading = <span className='truncate text-base font-semibold text-foreground-prominent'>{title}</span>;
	return (
		<div className='flex min-w-0 flex-col'>
			{versions.length || switchesPaths ? (
				<DropdownMenu>
					<h2 className='flex min-w-0'>
						<DropdownMenuTrigger asChild>
							<button
								type='button'
								title={title}
								className='flex min-w-0 items-center gap-1 rounded-md text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
							>
								{heading}
								<ChevronDown aria-hidden className='size-4 shrink-0 text-icon' />
							</button>
						</DropdownMenuTrigger>
					</h2>
					{/* 8px under "Version {n}" (its 18px line under the title), not over it. */}
					<DropdownMenuContent align='start' sideOffset={26} className='w-80'>
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
						{newestFirst.map((version, index) => {
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
					{title}
				</h2>
			)}
			{versions.length ? <p className='text-xs text-foreground-subtle'>Version {versions.length}</p> : null}
		</div>
	);
}

export { VersionsMenu, type VersionsMenuProps };
