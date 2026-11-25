import { Button } from "@/components/buttons/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/overlays/tooltip";

type PanelActionProps = {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	/** Why it can't be selected now: a tooltip on the disabled button. */
	hint?: string;
};

/**
 * A step's way forward, the one dark button at the top right of its panel (prds/sparks.md, "Moving through the steps"):
 * "Evaluate" in Prototype, "Add to Review" in Evaluate. (Review's, "Publish", is in the header.) Disabled with a `hint`, it says why in a
 * tooltip (a disabled button gets no pointer events, so the tooltip sits on a wrapper that takes focus).
 */
function PanelAction({ label, onClick, disabled = false, hint }: PanelActionProps) {
	if (disabled && hint)
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<span tabIndex={0} className='shrink-0 rounded-button-lg outline-none focus-visible:ring-2 focus-visible:ring-ring'>
						<Button variant='neutral' className='pointer-events-none' disabled>
							{label}
						</Button>
					</span>
				</TooltipTrigger>
				<TooltipContent side='bottom' sideOffset={6}>
					{hint}
				</TooltipContent>
			</Tooltip>
		);
	return (
		<Button variant='neutral' className='shrink-0' disabled={disabled} onClick={onClick}>
			{label}
		</Button>
	);
}

export { PanelAction, type PanelActionProps };
