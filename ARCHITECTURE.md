# Architecture

How each app's reference layouts in `src/layouts/` are wired: which file does what, how the pieces connect, and which files are sample data. One section per app. Read an app's section before working on its layouts, and update it in the same change when the wiring changes.

What's elsewhere:

| Looking for | Go to |
| --- | --- |
| Why something looks or behaves as it does; Figma ↔ code decisions | DESIGN.md |
| What the product should do | `prds/` |
| Repo-wide layout rules (sample data and its documented exceptions) | CLAUDE.md "Sample Data" |
| Animation rules and values | MOTION.md, `src/lib/motion/` |
| Component conventions (variants, stories, docs pages) | CLAUDE.md "Creating a Custom Component" |

ℹ️ The apps are listed in CLAUDE.md "Project". Each gets a folder in `src/layouts/<app>/`, and layouts used by more than one app live in `src/layouts/shared/`. Layouts aren't exported from `src/index.ts`. The first layout for a new app adds its section here.

## Writing an app's section

Name the section after the app. Paths in it are relative to `src/layouts/<app>/`. Cover, as tables where items have a name and a short note:

| Part | What it says |
| --- | --- |
| The shell | The app frame every screen shares (navigation, header, page switching) and what state it owns |
| Pages or flows | Each screen's files, how you reach it, and the steps between screens in a flow |
| Sample data | Every `sample-*` file, what it holds and who uses it. Screens never import samples: the stories pass them in. A screen that does is one of CLAUDE.md's documented exceptions, and says so here |
| Layout-only parts | Parts built in the layout because the design system doesn't have them yet. When it does, they move to `src/components/` and are exported |

Layouts shared by more than one app get a `## Shared` section first, with paths relative to `src/layouts/shared/`.

## AutoPartsHUB

Paths are relative to `src/layouts/autopartshub/`. Figma: Sparks (`ShkgoGYA4VmXg8xqfXBZLJ`).

### The shell

`autopartshub.tsx` exports `AutoPartsHubShell`, the frame every AutoPartsHUB page shares: the `background-subtle` page, and `AppHeader` with `AutoPartsHubLogo` on the left and the user's `Avatar` (`lg`) on the right. It takes the `user` (`AutoPartsHubUser`: `firstName`, optional `avatarSrc`) and the page as `children`. It owns no state.

### Pages

- **Home** (`home/home.tsx`, `AutoPartsHubHome`; Figma node 7:1021; PRD: [prds/autopartshub-home.md](prds/autopartshub-home.md)). Renders inside the shell. It shows "Welcome back, {firstName}", then `Tabs` (`line`, `lg`): "My apps" lists the user's apps as linked `AppCard`s, 3 per row above `lg`, 2 at `md`, 1 on phones. "Knowledge" and "Connections" show `EmptyState` until their content is designed. Each app's name and logo come from `appProducts` in the screen (product content); the API supplies which apps, their descriptions and links.

### Sample data

- **`home/sample-user.ts`** (`sampleUser`): the signed-in user (Dana) and the photo in `home/images/sample-avatar.png`.
- **`home/sample-apps.ts`** (`sampleApps`): the five apps in Figma's order, with their descriptions and placeholder `#` links.

Both are used only by `home/home.stories.tsx`.

### Layout-only parts

None. Every piece comes from `src/components/`.
