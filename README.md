# Mohammad M. Amirian — academic website

Public website: https://mohammad-amirian.github.io

Editor entry: https://mohammad-amirian.github.io/admin/

Secure editor: https://app.pagescms.org/

## First-time editor setup

1. Open Pages CMS and sign in with GitHub.
2. Install its GitHub App, selecting only `Mohammad-Amirian/mohammad-amirian.github.io`.
3. Open this repository on `main`. The `.pages.yml` configuration is already included.
4. Open **Website content**.

## Make changes

- Publications: expand **Publications**, edit an existing paper or add one. Give new papers a unique short ID (for example `new-paper-2027`). Select its status and whether it appears in Selected works.
- Photos: upload via the media manager, then select the image in a gallery event. Supply its caption, description, dates and source link.
- Text: expand **Texts**, find the section and existing label, then edit **Value**. Keep the existing text entries in place.
- Links: expand **Links** and edit the URL. Keep existing entries in place.
- CV: upload a PDF and select it in **Cv URL**.
- Save your changes. Each save commits to GitHub. GitHub Pages normally republishes within a few minutes.

All public content is stored in `content/site.json`; uploads are in `assets/uploads`. The site reads that content using `content.js` and renders it with `render-site.mjs` and `content/template.html`. No ChatGPT API, account, hosting or subscription is required. The initial `index.html` is a complete fallback page if JavaScript or a content request fails; it remains the initial export unless manually regenerated. Search engines that do not execute JavaScript may see that initial export.

The former ChatGPT Site/editor is a separate copy. Use Pages CMS for future GitHub-site changes. Old-editor changes will not update this repository.

## Edit directly in GitHub

You may also edit `content/site.json` using GitHub's file editor. Edit CSS in `styles.css` and layout in `content/template.html`. Avoid editing `index.html` for ordinary content changes: its contents are replaced with the JSON-driven rendering after page load.

## Restore a change

GitHub records every edit. Review commit history to recover earlier content. You can download the entire repository as a ZIP at any time.

## Hosting

Keep Settings → Pages set to Deploy from a branch → main → / (root). `.nojekyll` keeps the static files unchanged. Pages CMS is a separate provider: its service availability and terms are independent of GitHub and ChatGPT, and the open-source project can also be self-hosted.
