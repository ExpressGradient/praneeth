# Praneeth

Personal Website -> [saipraneeth.in](https://saipraneeth.in)

## Local development

Use Bun 1.4.4 to install dependencies and start the dev server.

```sh
bun install --frozen-lockfile
bun run dev
```

Run `bun run lint` to lint the code, `bun run build` to build the site, and `bun run start` to serve the production build locally.

## Page descriptions

Edit `description` in the frontmatter at the top of `content/about.md` or any Markdown file in `content/blog/` or `content/lab/`.

```yaml
description: "A short summary of this page."
```

Edit `content/descriptions.json` for the Blog index, Lab index, 404 page, and site-wide fallback. The site uses the description for its HTML metadata and social previews. Missing or blank descriptions use the fallback.
