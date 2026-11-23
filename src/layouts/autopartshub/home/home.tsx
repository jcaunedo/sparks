import * as React from "react";

import { CareLogo } from "@/components/brand/care-logo";
import { FlowLogo } from "@/components/brand/flow-logo";
import { Logo } from "@/components/brand/logo";
import { PulseLogo } from "@/components/brand/pulse-logo";
import { SalesLogo } from "@/components/brand/sales-logo";
import { AppCard } from "@/components/cards/app-card";
import { EmptyState } from "@/components/feedback/empty-state";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/navigation/tabs";
import { Typography } from "@/components/typography/typography";

import { AutoPartsHubShell, type AutoPartsHubUser } from "../autopartshub";
import type { NotificationsPopoverProps } from "../notifications-popover";

/* Product content: each app's name (for link labels) and logo. */
const appProducts = {
	pulse: { name: "Pulse", logo: <PulseLogo /> },
	// Figma "Variant2" at its own size, 197.842 × 37.145 (the artwork's full box), not Logo's default 36px.
	sparks: { name: "Sparks", logo: <Logo tone='on-light' className='h-[37.145px]' /> },
	flow: { name: "Flow", logo: <FlowLogo /> },
	sales: { name: "Sales", logo: <SalesLogo /> },
	care: { name: "Care", logo: <CareLogo /> },
} satisfies Record<string, { name: string; logo: React.ReactNode }>;

type AppId = keyof typeof appProducts;

/** An app the user has access to. */
type HomeApp = {
	id: AppId;
	description: string;
	/** Where the card opens the app. */
	href: string;
};

type AutoPartsHubHomeProps = {
	user: AutoPartsHubUser;
	/** The user's apps, in display order. */
	apps: HomeApp[];
	/** The tab open on arrival: "Apps" by default; "My library" when Sparks's "Add from library" opens the home. */
	defaultTab?: HomeTab;
	/** The bell's notifications (the same in every AutoPartsHUB header). */
	notifications?: NotificationsPopoverProps;
};

/** The home's tabs: "Apps", "My library", "Connections". */
type HomeTab = "apps" | "library" | "connections";

/**
 * AutoPartsHUB home: a welcome line and the user's apps, with tabs for their library and
 * connections. Figma: Sparks → "AutoPartsHUB" (node 7:1021).
 */
function AutoPartsHubHome({ user, apps, defaultTab = "apps", notifications }: AutoPartsHubHomeProps) {
	return (
		<AutoPartsHubShell user={user} notifications={notifications}>
			{/* Figma: content 1232px wide, centered (248px each side at 1728); 32px between blocks. 24px top (not Figma's 48: DESIGN.md → "Canvas top padding"), 48px bottom. */}
			<div className='mx-auto flex w-full max-w-[1296px] flex-1 flex-col gap-8 px-8 py-6'>
				<div className='flex flex-col'>
					<Typography as='h1' size='3xl' weight='semibold'>
						Welcome back, {user.firstName}
					</Typography>
					<Typography size='xl'>
						Connect with the tools, knowledge, and intelligence that power your work.
					</Typography>
				</div>

				{/* Keyed on the tab asked for, so a link to another tab opens on it. */}
				<Tabs key={defaultTab} defaultValue={defaultTab} className='flex-1 gap-6'>
					<TabsList variant='line' size='lg'>
						<TabsTrigger value='apps'>Apps</TabsTrigger>
						<TabsTrigger value='library'>My library</TabsTrigger>
						<TabsTrigger value='connections'>Connections</TabsTrigger>
					</TabsList>

					<TabsContent value='apps'>
						{/* Figma: 3 columns, 20px apart. 2 columns at md, 1 on phones. */}
						<ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
							{apps.map((app) => {
								const product = appProducts[app.id];
								return (
									<li key={app.id} className='flex'>
										{/* Each app opens in its own tab, so home stays open in this one; the tab is named for the app, so
										    selecting it again goes back to that tab instead of opening another (prds/autopartshub-home.md). */}
										<AppCard asChild logo={product.logo} description={app.description}>
											<a
												href={app.href}
												target={`autopartshub-${app.id}`}
												rel='noopener noreferrer'
												aria-label={`Open ${product.name} in its own tab`}
											/>
										</AppCard>
									</li>
								);
							})}
						</ul>
					</TabsContent>
					{/*
					 * Content not designed yet: each shows its empty state, centered in the rest of the screen
					 * (at least as tall as a row of cards).
					 */}
					<TabsContent value='library' className='flex'>
						<EmptyState
							className='min-h-[220px] flex-1'
							title='Nothing in your library yet'
							description="Files, notes and research you add will show up here."
						/>
					</TabsContent>
					<TabsContent value='connections' className='flex'>
						<EmptyState
							className='min-h-[220px] flex-1'
							title='No connections yet'
							description="When connections are added, they'll show up here."
						/>
					</TabsContent>
				</Tabs>
			</div>
		</AutoPartsHubShell>
	);
}

export { AutoPartsHubHome, type AutoPartsHubHomeProps, type HomeApp, type AppId, type HomeTab };
