import { DirectionCard as UclDirectionCard } from "@/components/chat/direction-card";
import { Badge } from "@/components/data-display/badge";

/**
 * One way to solve the problem, as Sparks drafts it (prds/sparks-plan-generate-directions.md, "What each direction
 * shows"). Strategic, not a design: where it changes things, how it rates, and its catch. Screens come in Prototype.
 */
type DirectionDraft = {
	id: string;
	name: string;
	/** One sentence. */
	idea: string;
	/** Where it changes things, in Dana's words: "On the product page", "Behind the scenes: …". */
	where: string;
	/** Its effect on the main measure: a word, never a score. */
	effect: "Big" | "Some" | "Little" | "Unclear";
	effort: { size: "Small" | "Medium" | "Large"; reason: string };
	risk: { level: "Low" | "Medium" | "High"; reason: string };
	/** What must not get worse (online sales): safe, to watch, or at risk. Weighed in Sparks's pick. */
	notWorse: "Safe" | "Watch" | "At risk";
	/** Its main downside, in one line, always shown. */
	catch: string;
	good: string;
	/** Three to five steps, as the person affected would live them. */
	howItWorks: string[];
	/** Which success measures it's likely to move, and why, with the source. */
	expectedImpact: string;
	buildsOn: string;
	unknowns: string[];
	departments: string;
	/** A previous experiment it looks like, and what was learned. */
	triedBefore?: string;
	/** Dana's own idea, from her first message. */
	fromDana?: boolean;
	/** The one Sparks recommends. */
	recommended?: boolean;
};

type DirectionCardProps = {
	direction: DirectionDraft;
	/** Its place among the directions in the reply (1, 2…), Sparks's pick first: "1. Fit check before you buy". */
	number?: number;
	/**
	 * Its call to action, full width at the bottom ("Generate prototype", or "Open prototype" once it's built):
	 * `directionActionFor` in workspace/plan-parts.ts.
	 */
	action?: { label: string; onClick: () => void };
	className?: string;
};

/**
 * A direction as a card in the conversation, shown with the others in one reply: UCL's `DirectionCard` (sparks.ds
 * "direction-card", 89:151) with the direction's content: its name and idea, where it changes things, its effect,
 * effort and risk, and its catch; the rest behind "Show more". "Recommended" on Sparks's pick (with the darker border),
 * "Your idea" on Dana's. No screen preview: Plan stays strategic (prds/sparks-plan-generate-directions.md, "What each
 * direction shows").
 */
function DirectionCard({ direction, number, action, className }: DirectionCardProps) {
	return (
		<UclDirectionCard
			className={className}
			number={number}
			title={direction.name}
			emphasized={Boolean(direction.recommended)}
			badges={
				direction.recommended || direction.fromDana ? (
					<>
						{direction.recommended ? (
							<Badge variant='flat' tone='green' size='xs'>
								Recommended
							</Badge>
						) : null}
						{direction.fromDana ? (
							<Badge variant='flat' tone='purple' size='xs'>
								Your idea
							</Badge>
						) : null}
					</>
				) : undefined
			}
			description={direction.idea}
			location={direction.where}
			// Words, not scores; the reasons are in the details.
			ratings={[
				{ label: "Effect", value: direction.effect },
				{ label: "Effort", value: direction.effort.size },
				{ label: "Risk", value: direction.risk.level },
			]}
			lines={[{ label: "The catch", content: direction.catch }]}
			details={[
				{ label: "What's good", content: direction.good },
				{
					label: "How it works",
					content: (
						<ol>
							{direction.howItWorks.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ol>
					),
				},
				{ label: "Expected effect", content: direction.expectedImpact },
				...(direction.triedBefore ? [{ label: "Tried before", content: direction.triedBefore }] : []),
				{
					label: "Effort",
					content: (
						<>
							{direction.effort.size}. {direction.effort.reason}
							<span className='block text-xs text-muted-foreground'>Sparks's estimate. Engineering confirms it in Review.</span>
						</>
					),
				},
				{ label: "Risk", content: `${direction.risk.level}. ${direction.risk.reason}` },
				{ label: "Builds on", content: direction.buildsOn },
				{
					label: "What we don't know yet",
					content: (
						<ul>
							{direction.unknowns.map((unknown) => (
								<li key={unknown}>{unknown}</li>
							))}
						</ul>
					),
				},
				{ label: "Teams it touches", content: direction.departments },
			]}
			action={action}
		/>
	);
}

export { DirectionCard, type DirectionCardProps, type DirectionDraft };
