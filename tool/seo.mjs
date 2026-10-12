/*
 * 搜索引擎用的构建期产物，全是纯函数，由构建脚本调用、由 tool/seo.test.mjs 守：
 *   - 结构化数据（JSON-LD）：首页 SoftwareApplication + WebSite，常见问题文章 TechArticle + BreadcrumbList；
 *   - sitemap.xml：语言路由页带全部 hreflang，常见问题文章带它的各语言版本；
 *   - 首页大块内联脚本外置：17 份语言首页共用同一批 demo 脚本，烤完后抽成带内容哈希的
 *     /assets/home-<hash>.js，HTML 里只剩正文（爬虫读到的不再是 600 多 KB 的 JS 字符串）。
 */

import { createHash } from 'node:crypto';
import { DEFAULT_LANG, LANGS, PAGES, SITE, routeFor } from '../.vitepress/theme/lang-routes.mjs';

/** 常见问题文章的语言 → 文件名后缀（原文 zh-CN 没有后缀）。只有这三种语言写了文章。 */
export const FAQ_LANGS = ['zh-CN', 'en', 'zh-HK'];

/** @param {string} slug @param {string} lang FAQ_LANGS 之一 @returns {string} 站内路径 */
export const faqPath = (slug, lang) => '/faq/' + slug + (lang === 'zh-CN' ? '' : '.' + lang);

/**
 * 首页上指向某篇常见问题的链接，按页面语言挑文章版本：简体 → 原文，繁体 → .zh-HK，其余 → 英文版。
 * @param {string} href 形如 /faq/<slug>（不带语言后缀）；其它链接原样返回
 * @param {string} code 页面语言
 * @returns {string}
 */
export function localizeFaqHref(href, code) {
  const m = /^\/faq\/([a-z0-9-]+)([?#].*)?$/.exec(href);
  if (!m) return href;
  const lang = code === 'zh-CN' || code === 'zh-HK' ? code : 'en';
  return faqPath(m[1], lang) + (m[2] || '');
}

/** JSON 放进 <script> 里：`</` 必须转义，否则会提前闭合标签。 */
export const ldScript = (obj) =>
  '<script type="application/ld+json">' + JSON.stringify(obj).replace(/<\//g, '<\\/') + '</script>';

const PUBLISHER = { '@type': 'Organization', name: 'Fushi', url: SITE + '/', logo: SITE + '/fushi-icon.png' };

/**
 * 首页的结构化数据。只写可核实的事实：没有评分就不写 aggregateRating（编造评分违反 Google 结构化数据政策）。
 * @param {string} code 页面语言
 * @param {{ title: string, description: string }} meta 已去标签的标题 / 描述
 * @returns {object[]}
 */
export function homeJsonLd(code, { title, description }) {
  const url = SITE + routeFor(code, '/');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Fushi',
      alternateName: ['fushi.moe', title],
      url: SITE + '/',
      inLanguage: code,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Fushi',
      url,
      description,
      inLanguage: code,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Language learning',
      operatingSystem: 'Windows, macOS, Android, iOS',
      downloadUrl: SITE + routeFor(code, '/download'),
      image: SITE + '/fushi-icon.png',
      license: 'https://www.gnu.org/licenses/gpl-3.0.html',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      sameAs: ['https://github.com/hajisensai/Fushi'],
      publisher: PUBLISHER,
    },
  ];
}

/** 文章语言 → 面包屑第一级「首页」该指向的语言首页。 */
const homeOfLang = (lang) => SITE + routeFor(LANGS.includes(lang) ? lang : DEFAULT_LANG, '/');

/**
 * 常见问题文章的结构化数据。
 * @param {{ url: string, title: string, description: string, lang: string, date: string, faqTitle: string }} a
 * @returns {object[]}
 */
export function faqArticleJsonLd({ url, title, description, lang, date, faqTitle }) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: title,
      description,
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
      ...(date ? { dateModified: date } : {}),
      about: { '@type': 'SoftwareApplication', name: 'Fushi', url: SITE + '/' },
      author: PUBLISHER,
      publisher: PUBLISHER,
      image: SITE + '/fushi-icon.png',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Fushi', item: homeOfLang(lang) },
        { '@type': 'ListItem', position: 2, name: faqTitle, item: SITE + '/faq' },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
  ];
}

const escXml = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @typedef {{ loc: string, lastmod?: string, alternates?: [string, string][] }} SitemapEntry
 * @param {SitemapEntry[]} entries loc / alternates 都是绝对地址
 * @returns {string} sitemap.xml 全文
 */
export function sitemapXml(entries) {
  const seen = new Set();
  const body = entries.map((e) => {
    if (seen.has(e.loc)) throw new Error('duplicate sitemap loc ' + e.loc);
    seen.add(e.loc);
    return '  <url>\n    <loc>' + escXml(e.loc) + '</loc>\n' +
      (e.lastmod ? '    <lastmod>' + escXml(e.lastmod) + '</lastmod>\n' : '') +
      (e.alternates || []).map(([hl, href]) => '    <xhtml:link rel="alternate" hreflang="' + escXml(hl) + '" href="' + escXml(href) + '"/>\n').join('') +
      '  </url>\n';
  }).join('');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    body + '</urlset>\n';
}

/** 语言路由页（首页 / 下载页 / 沉浸页）× 17 种语言，每条都带全部 hreflang + x-default。 */
export function langRouteEntries() {
  const out = [];
  for (const page of PAGES) {
    const alternates = LANGS.map((c) => [c, SITE + routeFor(c, page)]);
    alternates.push(['x-default', SITE + routeFor(DEFAULT_LANG, page)]);
    for (const code of LANGS) out.push({ loc: SITE + routeFor(code, page), alternates });
  }
  return out;
}

/**
 * 常见问题文章：同一 slug 的各语言版本互挂 hreflang（x-default 指英文版，没有英文版就指原文）。
 * @param {{ slug: string, lang: string, date: string, draft: boolean }[]} articles
 */
export function faqEntries(articles) {
  const bySlug = new Map();
  for (const a of articles) {
    if (a.draft) continue;
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, []);
    bySlug.get(a.slug).push(a);
  }
  const out = [];
  for (const [slug, versions] of [...bySlug].sort(([x], [y]) => x.localeCompare(y))) {
    const alt = versions.map((v) => [v.lang, SITE + faqPath(slug, v.lang)]);
    const xd = alt.find(([l]) => l === 'en') || alt.find(([l]) => l === 'zh-CN') || alt[0];
    const alternates = alt.length > 1 ? [...alt, ['x-default', xd[1]]] : [];
    for (const v of versions) out.push({ loc: SITE + faqPath(slug, v.lang), lastmod: v.date || undefined, alternates });
  }
  return out;
}

/**
 * 把 HTML 里足够大的「裸」内联脚本（`<script>` 不带任何属性——带 type / id / src 的一律不动）抽成外部文件。
 * 外部同步脚本与内联脚本执行顺序、全局作用域完全相同；文件名带内容哈希，可以放心长缓存。
 * @param {string} html
 * @param {number} minBytes 小于它的内联脚本留在页面里
 * @returns {{ html: string, files: { name: string, content: string }[] }} name 是 assets/ 下的文件名
 */
export function externalizeScripts(html, minBytes) {
  const files = [];
  const out = html.replace(/<script>([\s\S]*?)<\/script>/g, (whole, code) => {
    if (Buffer.byteLength(code, 'utf8') < minBytes) return whole;
    const name = 'home-' + createHash('sha256').update(code).digest('hex').slice(0, 16) + '.js';
    if (!files.some((f) => f.name === name)) files.push({ name, content: code });
    return '<script src="/assets/' + name + '"></script>';
  });
  return { html: out, files };
}
