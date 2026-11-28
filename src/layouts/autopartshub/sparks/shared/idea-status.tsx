import { Badge, type BadgeProps } from "@/components/data-display/badge";

/**
 * Where an idea stands (prds/sparks.md, "Where an idea stands"): a draft while she works on it, ready to publish once
 * Review has put it together, in review once published (with the teams), then waiting for the decision owner and
 * decided. The same labels and colors in the header and on the start page.
 */
type IdeaStatus = "draft" | "ready" | "in-review" | "waiting" | "advanced" | "stopped";

const ideaStatusBadge: Record<IdeaStatus, { label: string; tone: BadgeProps["tone"] }> = {
	draft: { label: "Draft", tone: "neutral" },
	// Yellow, as Review's "Ready to publish" was.
	ready: { label: "Ready to publish", tone: "yellow" },
	// Published: with the teams, from the moment it's sent until she asks for a decision. One status, not how far each
	// team is (Review shows that). Purple, as in sparks.ds "Sparks Project" (124:1752); the start page's "In review" too.
	"in-review": { label: "In review", tone: "purple" },
	waiting: { label: "Waiting for a decision", tone: "amber" },
	advanced: { label: "Advanced", tone: "green" },
	stopped: { label: "Stopped", tone: "neutral" },
};

/**
 * Where the idea stands for a team member who opened it from Dana's invitation (prds/sparks-review.md, "What reviewers
 * see and do"): their assessment to give ("Waiting for your assessment"); once given, where the idea stands ("In review",
 * as Dana's); then the decision.
 */
type TeamMemberStatus = "assess" | "assessed" | "advanced" | "stopped";

const teamMemberStatusBadge: Record<TeamMemberStatus, { label: string; tone: BadgeProps["tone"] }> = {
	// Theirs to do: yellow, as Dana's "Ready to publish".
	assess: { label: "Waiting for your assessment", tone: "yellow" },
	// Given: where the idea stands, as in Dana's header ("In review", purple); "Assessment shared" is the header's button.
	assessed: ideaStatusBadge["in-review"],
	advanced: ideaStatusBadge.advanced,
	stopped: ideaStatusBadge.stopped,
};

/** A status as a flat badge (24px), with its date after it when it has one ("Advanced · Nov 12"). */
function StatusBadge({ label, tone, date, className }: { label: string; tone: BadgeProps["tone"]; date?: string; className?: string }) {
	return (
		<Badge variant='flat' tone={tone} size='xs' className={className}>
			{date ? `${label} · ${date}` : label}
		</Badge>
	);
}

/** The idea's status, in Dana's header. */
function IdeaStatusBadge({ status, ...props }: { status: IdeaStatus; date?: string; className?: string }) {
	return <StatusBadge {...ideaStatusBadge[status]} {...props} />;
}

/** The idea's status for a team member, in the header of the page they open. */
function TeamMemberStatusBadge({ status, ...props }: { status: TeamMemberStatus; date?: string; className?: string }) {
	return <StatusBadge {...teamMemberStatusBadge[status]} {...props} />;
}

export { IdeaStatusBadge, ideaStatusBadge, TeamMemberStatusBadge, teamMemberStatusBadge, type IdeaStatus, type TeamMemberStatus };
