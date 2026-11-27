import type * as React from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/buttons/button";
import { PublishItems, type PublishItem } from "@/components/overlays/publish-popover";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

/*
 * The email reviewers get when Dana publishes her idea (Figma: Sparks "Email", 80:763; prds/sparks-review.md, "The
 * invitation"): who invited them, what's shared (the same list as "Publish your idea": each idea, with its paths at their
 * versions), Sparks's message (and her note, if she added one), when to review it by, "View idea", and Sparks's sign-off. Also shown in "Publish your idea" ("View invite email").
 */

type InvitationEmailProps = {
	/** Who invited them: "Dana Morales". */
	from: string;
	/**
	 * What's shared: the same items as "What you're sharing" in "Publish your idea", ideas with their paths. One idea: its
	 * name under the heading; with one path, "Prototype: {path}" and "Version: n" with the date (Figma 80:763), with
	 * several, its paths listed. Several ideas: the heading counts the ideas (not the paths) and they're listed as in the
	 * popover.
	 */
	items: PublishItem[];
	/** Sparks's standard message for the idea. */
	message: string;
	/** Dana's note ("Add a note" in "Publish your idea"), after the message. Line breaks show. */
	note?: string;
	/** When to review it by, a week after publishing: "December 3". */
	due: string;
/** Where "View idea" goes: the published idea's page. Without it, the button does nothing (a preview). */
	reviewHref?: string;
	onReview?: () => void;
	/** `page`: the email on its own, 145px from the top as in Figma; `preview`: just the content (e.g. in a dialog). */
	variant?: "page" | "preview";
	className?: string;
};

/** The invitation email, as reviewers get it. */
function InvitationEmail({ from, items, message, note, due, reviewHref, onReview, variant = "page", className }: InvitationEmailProps) {
	// One idea: its name under the heading. With one path, the path and its version go with the date; with several, listed.
	const single = items.length === 1 ? items[0] : undefined;
	const paths = single?.paths ?? [];
	const onePath = paths.length === 1 ? paths[0] : undefined;
	const content = (
		// Figma 80:767: the logo, then 41px down the text, 640px wide; the button 24px under the text, the sign-off 40px under it.
		<div className='flex w-full max-w-[640px] flex-col gap-10'>
			<div className='flex flex-col items-start gap-6'>
				<div className='flex flex-col gap-2 text-foreground'>
					<Typography as='h1' size='2xl' weight='semibold'>
						{from} invited you to review {single ? "an idea" : `${items.length} ideas`}
					</Typography>
					{/* One: its name (lg semibold). Several: listed as "Publish your idea" lists them. */}
					{single ? (
						<>
							<Typography as='h2' size='lg' weight='semibold'>
								{single.name}
							</Typography>
							{paths.length > 1 ? (
								<PublishItems aria-label="What's shared" items={items} className='my-2' />
							) : null}
						</>
					) : (
						<PublishItems aria-label="What's shared" items={items} className='my-2' />
					)}
					{/* base, then the details sm, 16px apart (paragraph-gap/base). */}
					<div className='flex flex-col gap-4'>
						<p className='text-base'>{message}</p>
						{note ? <p className='text-base whitespace-pre-line'>{note}</p> : null}
						<p className='text-sm'>
							<span className='text-muted-foreground'>Review by: </span>
							{due}
							{onePath ? (
								<>
									<br />
									<span className='text-muted-foreground'>Prototype: </span>
									{onePath.name}
									<br />
									<span className='text-muted-foreground'>Version: </span>
									{onePath.version}
								</>
							) : single && !paths.length && single.version !== undefined ? (
								<>
									<br />
									<span className='text-muted-foreground'>Version: </span>
									{single.version}
								</>
							) : null}
						</p>
					</div>
				</div>
				<div>
					{reviewHref ? (
						<Button variant='neutral' asChild>
							<a href={reviewHref} onClick={onReview} target='_blank' rel='noreferrer'>
								View idea
							</a>
						</Button>
					) : (
						<Button variant='neutral' onClick={onReview}>
							View idea
						</Button>
					)}
				</div>
			</div>
			<div className='flex flex-col gap-4 text-sm'>
				<p className='text-foreground'>
					<span className='font-bold'>The Sparks Team</span>
					<br />
					Turning ideas into better experiences.
				</p>
				<p className='text-muted-foreground'>
					This invitation and its associated content are confidential and intended for internal review only.
					<br />
					Please do not share outside the organization.
				</p>
			</div>
		</div>
	);
	return (
		// The 640px column centered, on its own page and in a preview (e.g. Publish's dialog).
		<div className={cn("flex flex-col items-center gap-[41px] bg-background", variant === "page" && "min-h-screen px-6 pt-[145px] pb-20", className)}>
			{/* The Sparks wordmark, 37px tall (Figma "SPARKS Logo", 198 × 37). */}
			<div className='w-full max-w-[640px]'>
				<Logo tone='on-light' className='h-[37px]' />
			</div>
			{content}
		</div>
	);
}

export { InvitationEmail, type InvitationEmailProps };
