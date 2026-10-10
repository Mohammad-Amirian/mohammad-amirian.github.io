import { renderSite } from './render-site.mjs';

// Content and images live in this GitHub repository; no ChatGPT services are used.
function validateContent(data) {
  const safeURL = value => !value || /^(https:\/\/|mailto:|\/assets\/|assets\/|#)/i.test(value);
  const ids = new Set();
  for (const p of data.publications) {
    if (!p.id || ids.has(p.id)) throw new Error('Publications need unique identifiers.');
    ids.add(p.id);
    if (!['published','accepted','review','preprint','preparation'].includes(p.status)) throw new Error('Invalid publication status.');
    if (!safeURL(p.primaryUrl) || p.links.some(l => !safeURL(l.url))) throw new Error('Invalid publication URL.');
  }
  if (!safeURL(data.heroImage) || !safeURL(data.cvUrl) || data.links.some(l => !safeURL(l.url))) throw new Error('Invalid website URL.');
  for (const event of data.gallery) {
    if (!safeURL(event.url) || event.photos.some(p => !safeURL(p.src))) throw new Error('Invalid gallery URL.');
  }
}

try {
  const responses = await Promise.all([
    fetch('./content/site.json', { cache: 'no-cache', signal: AbortSignal.timeout(10000) }),
    fetch('./content/template.html', { cache: 'no-cache', signal: AbortSignal.timeout(10000) })
  ]);
  if (responses.some(r => !r.ok)) throw new Error('Website content unavailable.');
  const [data, template] = await Promise.all([responses[0].json(), responses[1].text()]);
  validateContent(data);
  const parsed = new DOMParser().parseFromString(renderSite(data, template), 'text/html');
  parsed.body.querySelectorAll('script').forEach(script => script.remove());
  document.body.replaceChildren(...Array.from(parsed.body.childNodes));
  document.title = data.meta.title;
  document.querySelector('meta[name="description"]').content = data.meta.description;
} catch (error) {
  // Keep the complete initial page usable if content cannot be loaded.
  console.error('Could not load updated website content:', error);
}
const navigation = document.createElement('script');
navigation.src = './site.js';
navigation.onload = () => {
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
};
document.body.append(navigation);
