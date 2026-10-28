# Neil's Portfolio

Week 3 App Dev Bootcamp portfolio, built with React, TypeScript, and Vite.

## Run locally

```sh
bun install
bun run dev
```

Open the local URL printed by Vite. npm also works (`npm install`, then `npm run dev`).

## Features

- Introduction, About, Projects & Experience, and Contact sections
- Responsive layout for desktop and mobile
- Search by project name, topic, or description
- Save/unsave buttons and a Saved filter (saves reset on reload)
- Empty states, keyboard focus styles, and accessible input/button labels

## React concepts

`App` manages search, saved IDs, and the selected filter with `useState`. It passes projects and a save callback to `ProjectGrid`, which renders reusable `ProjectCard` components through props. The cards call the callback to update state in the parent.

Edit the `projects` array in `src/App.tsx` to update project descriptions, tags, or links. Only the portfolio currently has a public code link; the other cards describe robotics experience and Java coursework.

## Checks

```sh
bun run build
bun run lint
```
