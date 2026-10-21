export function escapeHtml(v) {return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const link=(url,label)=>`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
export function renderSite(data, template) {
 const tokens={metaTitle:escapeHtml(data.meta.title),metaDescription:escapeHtml(data.meta.description),heroImage:escapeHtml(data.heroImage),heroAlt:escapeHtml(data.heroAlt),cvUrl:escapeHtml(data.cvUrl),publicationCount:String(data.publications.length)};
 for(const item of data.texts)tokens[item.id]=escapeHtml(item.value);
 for(const item of data.links)tokens[item.id]=escapeHtml(item.url);
 tokens.publications=[...data.publications].sort((a,b)=>Number(b.year)-Number(a.year)).map(p=>{
  const status=p.status==='accepted'?'published':p.status;
  const badge={published:'Published',accepted:'Accepted',review:'Under review',preprint:'Preprint',preparation:'In preparation'}[p.status];
  const authors=escapeHtml(p.authors).replace(/M\. M\. Amirian|Mohammad M\. Amirian/g,m=>`<strong>${m}</strong>`);
  return `<article class="publication" id="${escapeHtml(p.id)}" data-status="${status}" data-selected="${p.selected}"><div class="pub-year">${escapeHtml(p.year)}</div><div><h3>${p.primaryUrl?link(p.primaryUrl,p.title):escapeHtml(p.title)}</h3><p class="pub-authors">${authors}</p><div class="pub-meta"><span class="pub-venue">${escapeHtml(p.venue)}</span><span class="pub-badge ${p.status==='accepted'?'accepted':status==='review'?'review':''}">${badge}</span></div>${p.links.length?`<div class="pub-links">${p.links.map(l=>link(l.url,l.label)).join('')}</div>`:''}</div></article>`;
 }).join('\n');
 tokens.gallery=data.gallery.map(e=>`<article class="moment${e.photos.length>1?' moment-pair':''}" id="${escapeHtml(e.id)}" aria-labelledby="${escapeHtml(e.id)}-title"><div class="moment-photos">${e.photos.map(p=>`<a class="moment-photo" href="${escapeHtml(p.src)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml('Open full photo: '+p.alt)}"><img src="${escapeHtml(p.src)}" width="${p.width}" height="${p.height}" alt="${escapeHtml(p.alt)}" loading="lazy" decoding="async"><span class="photo-open" aria-hidden="true">View photo</span></a>`).join('')}</div><div class="moment-copy"><p class="moment-date"><time datetime="${escapeHtml(e.datetime)}">${escapeHtml(e.date)}</time></p><h3 id="${escapeHtml(e.id)}-title">${escapeHtml(e.title)}</h3><p class="moment-location">${escapeHtml(e.location)}</p><p class="moment-description">${escapeHtml(e.description)}</p><div class="moment-footer">${e.url?`<span class="text-link">${link(e.url,e.link_label||'Read more')}</span>`:''}${e.credit?`<p class="photo-credit">Photo: ${escapeHtml(e.credit)}</p>`:''}</div></div></article>`).join('\n');
 let page = template.replace(/\{\{([a-zA-Z0-9_-]+)\}\}/g,(_,key)=>tokens[key]??'').replace('</head>','<meta name="generator" content="Amirian website editor"></head>');
 const available = new Set(data.publications.map(p=>p.id));
 for (const p of ['photoinhibition-paper','memory-paper','picurve-paper','pidata-paper']) if (!available.has(p)) page=page.replaceAll('href="#'+p+'"','href="#publications"');
 return page;
}
