# amurark3.github.io

Aditya Murarka's portfolio website — Next.js (static export) + Tailwind CSS, deployed to GitHub Pages on every push to `main`.

## Updating content

All page content lives in [`data/resume.ts`](data/resume.ts) and mirrors the resume PDF.

1. Replace `public/Aditya_Murarka_Resume.pdf` with the new resume.
2. Update `data/resume.ts` to match.
3. Run `npm test` to validate the data (links, required fields).

To show a portrait in the hero instead of the ASCII sphere, add a transparent-background image to `public/` and set `basics.heroImage` (e.g. `"/profile.png"`).

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests (Node's built-in test runner)
npm run lint
npm run build   # static export to ./out
```

Design inspired by [gazijarin.com](https://www.gazijarin.com/).
