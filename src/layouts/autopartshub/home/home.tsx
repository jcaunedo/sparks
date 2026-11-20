import * as React from "react";

import { CareLogo } from "@/components/brand/care-logo";
import { FlowLogo } from "@/components/brand/flow-logo";
import { Logo } from "@/components/brand/logo";
import { PulseLogo } from "@/components/brand/pulse-logo";
import { SalesLogo } from "@/components/brand/sales-logo";
import { AppCard } from "@/components/cards/app-card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/navigation/tabs";
import { Typography } from "@/components/typography/typography";

import { AutoPartsHubShell, type AutoPartsHubUser } from "../autopartshub";

/* Product content: each app's name (for link labels) and logo. */
const appProducts = {
	pulse: { name: "Pulse", logo: <PulseLogo /> },
	sparks: { name: "Sparks", logo: <Logo tone='on-light' /> },
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
};

/**
 * AutoPartsHUB home: a welcome line and the user's apps, with tabs for knowledge and
 * connections. Figma: Sparks → "AutoPartsHUB" (node 7:1021).
 */
function AutoPartsHubHome({ user, apps }: AutoPartsHubHomeProps) {
	return (
		<AutoPartsHubShell user={user}>
			{/* Figma: content 1232px wide, centered (248px each side at 1728); 48px top and bottom, 32px between blocks. */}
			<div className='mx-auto flex w-full max-w-[1296px] flex-col gap-8 px-8 py-12'>
				<div className='flex flex-col'>
					<Typography as='h1' size='4xl' weight='semibold'>
						Welcome back, {user.firstName}
					</Typography>
					<Typography size='xl'>
						Connect with the tools, knowledge, and intelligence that power your work.
					</Typography>
				</div>

				<Tabs defaultValue='apps' className='gap-6'>
					<TabsList variant='line' size='lg'>
						<TabsTrigger value='apps'>My apps</TabsTrigger>
						<TabsTrigger value='knowledge'>Knowledge</TabsTrigger>
						<TabsTrigger value='connections'>Connections</TabsTrigger>
					</TabsList>

					<TabsContent value='apps'>
						{/* Figma: 3 columns, 30px apart. 2 columns at md, 1 on phones. */}
						<ul className='grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3'>
							{apps.map((app) => {
								const product = appProducts[app.id];
								return (
									<li key={app.id} className='flex'>
										<AppCard asChild logo={product.logo} description={app.description}>
											<a href={app.href} aria-label={`Open ${product.name}`} />
										</AppCard>
									</li>
								);
							})}
						</ul>
					</TabsContent>
					{/* Not designed yet: empty until Figma has these panels. */}
					<TabsContent value='knowledge' />
					<TabsContent value='connections' />
				</Tabs>
			</div>
		</AutoPartsHubShell>
	);
}

export { AutoPartsHubHome, type AutoPartsHubHomeProps, type HomeApp, type AppId };
