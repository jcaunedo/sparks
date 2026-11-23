import * as React from "react";

import { Typography } from "@/components/typography/typography";

/*
 * The building blocks of the plan's sections (prds/sparks.md, "The finished plan"): a part with its heading,
 * and a list that says "None." when it's empty. Every section after Plan's uses them, so they read the same.
 */

/** A part of a section: its heading, then what it holds. */
function ConceptPart({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section aria-label={title} className='flex flex-col gap-1.5'>
			<Typography as='h4' size='sm' weight='semibold' className='text-foreground'>
				{title}
			</Typography>
			{children}
		</section>
	);
}

/** A list, or "None." (or `empty`) when there's nothing in it. */
function ConceptItems({ items, empty = "None." }: { items: React.ReactNode[]; empty?: string }) {
	if (!items.length) return <p className='text-sm text-muted-foreground'>{empty}</p>;
	return (
		<ul className='flex list-disc flex-col gap-1 ps-5 text-sm text-foreground'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);
}

export { ConceptItems, ConceptPart };
