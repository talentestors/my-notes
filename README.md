# my-notes

Personal Knowledge Base

Place for notes | ～(∠・ω< )⌒☆​

[![license](https://img.shields.io/github/license/talentestors/my-notes.svg)](./LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/60b211c4-095a-4d8e-b520-64801c7e5ca2/deploy-status)](https://app.netlify.com/projects/yuhiri-lib/deploys)

Environment:

nodejs >=22.x

```bash
corepack enable
```

- `pnpm install`

Run:

- `pnpm run docs:dev`
- `pnpm run docs:clean-dev`

Build:

- `pnpm run docs:build`

Update:

- `pnpm run docs:update-package`  

> [!TIP]
> If Node.js memory is not enough, you can set the environment variable
> 
> `NODE_OPTIONS=--max_old_space_size=4096`
> 
> or
> 
> `NODE_OPTIONS=--max_old_space_size=8192`
