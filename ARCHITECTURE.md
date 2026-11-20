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

ℹ️ The apps are listed in CLAUDE.md "Project". Each gets a folder in `src/layouts/<app>/`, and layouts used by more than one app live in `src/layouts/shared/`. Layouts aren't exported from `src/index.ts`. No layouts exist yet: the first layout for an app adds its section here.

## Writing an app's section

Name the section after the app. Paths in it are relative to `src/layouts/<app>/`. Cover, as tables where items have a name and a short note:

| Part | What it says |
| --- | --- |
| The shell | The app frame every screen shares (navigation, header, page switching) and what state it owns |
| Pages or flows | Each screen's files, how you reach it, and the steps between screens in a flow |
| Sample data | Every `sample-*` file, what it holds and who uses it. Screens never import samples: the stories pass them in. A screen that does is one of CLAUDE.md's documented exceptions, and says so here |
| Layout-only parts | Parts built in the layout because the design system doesn't have them yet. When it does, they move to `src/components/` and are exported |

Layouts shared by more than one app get a `## Shared` section first, with paths relative to `src/layouts/shared/`.
