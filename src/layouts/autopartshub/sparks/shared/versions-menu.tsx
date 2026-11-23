import * as React from "react";
import { History } from "lucide-react";

import { Button } from "@/components/buttons/button";

import { HeaderIconButton } from "../../header-icon-button";

/*
 * "Versions ({n})": the prototype's versions (prds/sparks-prototype.md, "Versions") and the plan's
 * (prds/sparks.md, "The finished plan"). One menu, so both behave the same: newest first, each named for what changed, the
 * current one marked "Current" and every other with "Restore", which saves it again as the newest.
 */

/** The versions, newest first, each restorable but the current one. Closes on Esc or a click outside. */
function VersionsMenu({ versions, onRestore }: { versions: { id: string; name: string }[]; onRestore?: (id: string) => void }) {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const listId = React.useId();
	React.useEffect(() => {
		if (!open) return;
		const close = (event: MouseEvent | KeyboardEvent) => {
			if (event instanceof KeyboardEvent ? event.key === "Escape" : !ref.current?.contains(event.target as Node)) setOpen(false);
		};
		window.addEventListener("mousedown", close);
		window.addEventListener("keydown", close);
		return () => {
			window.removeEventListener("mousedown", close);
			window.removeEventListener("keydown", close);
		};
	}, [open]);
	const newestFirst = [...versions].reverse();
	return (
		<div ref={ref} className='relative'>
			<HeaderIconButton
				label={`Versions (${versions.length})`}
				aria-expanded={open}
				aria-controls={listId}
				onClick={() => setOpen((value) => !value)}
			>
				<History aria-hidden />
			</HeaderIconButton>
			{open ? (
				<ol
					id={listId}
					aria-label='Versions, newest first'
					className='absolute right-0 z-20 mt-1 flex max-h-80 w-80 flex-col overflow-y-auto rounded-card border border-border bg-background p-1 shadow-lg'
				>
					{newestFirst.map((version, index) => (
						<li key={version.id} className='flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm'>
							<span className='flex min-w-0 flex-col'>
								<span className='truncate text-foreground' title={version.name}>{version.name}</span>
								<span className='text-xs text-muted-foreground'>Version {versions.length - index}</span>
							</span>
							{index === 0 ? (
								<span className='shrink-0 text-xs text-muted-foreground'>Current</span>
							) : (
								<Button
									variant='outline'
									size='sm'
									className='shrink-0 rounded-button-md'
									onClick={() => {
										onRestore?.(version.id);
										setOpen(false);
									}}
								>
									Restore
								</Button>
							)}
						</li>
					))}
				</ol>
			) : null}
		</div>
	);
}

export { VersionsMenu };
