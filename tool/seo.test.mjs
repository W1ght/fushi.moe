import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, PAGES, SITE, routeFor } from '../.vitepress/theme/lang-routes.mjs';
import { renderHome } from './build_lang_routes.mjs';
import { readFaqArticles } from './build_sitemap.mjs';
import {
  externalizeScripts, faqArticleJsonLd, faqEntries, faqPath, homeJsonLd, langRouteEntries, ldScript, localizeFaqHref, sitemapXml,
} from './seo.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const dictOf = (c) => JSON.parse(read('public/i18n/' + c + '.json'));

test('首页上的常见问题链接按页面语言挑文章版本', () => {
  assert.equal(localizeFaqHref('/faq/anki', 'zh-CN'), '/faq/anki');
  assert.equal(localizeFaqHref('/faq/anki', 'zh-HK'), '/faq/anki.zh-HK');
  assert.equal(localizeFaqHref('/faq/anki', 'de'), '/faq/anki.en');
  assert.equal(localizeFaqHref('/faq/anki#x', 'en'), '/faq/anki.en#x');
  assert.equal(localizeFaqHref('/faq', 'de'), '/faq', '列表页不分语言');
  assert.equal(localizeFaqHref('/faq/anki.en', 'ja'), '/faq/anki.en', '已带语言后缀的原样');
  assert.equal(localizeFaqHref('/download', 'ja'), '/download');
  assert.equal(faqPath('x', 'zh-CN'), '/faq/x');
  assert.equal(faqPath('x', 'en'), '/faq/x.en');
});

test('JSON-LD：</ 被转义；首页不编造评分；文章带面包屑', () => {
  assert.equal(ldScript({ a: '</script>' }), '<script type="application/ld+json">{"a":"<\\/script>"}</script>');
  const [site, app] = homeJsonLd('de', { title: 'T', description: 'D' });
  assert.equal(site['@type'], 'WebSite');
  assert.equal(app['@type'], 'SoftwareApplication');
  assert.equal(app.url, SITE + '/de/');
  assert.equal(app.downloadUrl, SITE + '/de/download');
  assert.equal(app.offers.price, '0');
  assert.ok(!('aggregateRating' in app) && !('review' in app), '没有真实评分就不能写 aggregateRating / review');
  const [art, crumbs] = faqArticleJsonLd({ url: SITE + '/faq/x.en', title: 'Q?', description: 'A', lang: 'en', date: '2026-10-12', faqTitle: 'FAQ' });
  assert.equal(art['@type'], 'TechArticle');
  assert.equal(art.dateModified, '2026-10-12');
  assert.deepEqual(crumbs.itemListElement.map((i) => i.item), [SITE + '/', SITE + '/faq', SITE + '/faq/x.en']);
  const [, zh] = faqArticleJsonLd({ url: SITE + '/faq/x', title: 'Q', description: '', lang: 'zh-CN', date: '', faqTitle: '常见问题' });
  assert.equal(zh.itemListElement[0].item, SITE + '/zh-cn/', '面包屑首页指向文章语言的首页');
});

test('sitemap：语言路由页带全部 hreflang，常见问题按 slug 互挂，草稿不收，地址不重复', () => {
  const routes = langRouteEntries();
  assert.equal(routes.length, PAGES.length * LANGS.length);
  for (const e of routes) {
    assert.equal(e.alternates.length, LANGS.length + 1);
    assert.equal(e.alternates.at(-1)[0], 'x-default');
  }
  const faq = faqEntries([
    { slug: 'a', lang: 'zh-CN', date: '2026-01-01', draft: false },
    { slug: 'a', lang: 'en', date: '2026-01-01', draft: false },
    { slug: 'b', lang: 'zh-CN', date: '', draft: false },
    { slug: 'c', lang: 'zh-CN', date: '', draft: true },
  ]);
  assert.deepEqual(faq.map((e) => e.loc), [SITE + '/faq/a', SITE + '/faq/a.en', SITE + '/faq/b']);
  assert.deepEqual(faq[0].alternates.at(-1), ['x-default', SITE + '/faq/a.en']);
  assert.deepEqual(faq[2].alternates, [], '只有一个语言版本的不挂 hreflang');
  const xml = sitemapXml([{ loc: SITE + '/a?x=1&y=2', lastmod: '2026-01-01', alternates: [['en', SITE + '/a']] }]);
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9" xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml">/);
  assert.ok(xml.includes('<loc>' + SITE + '/a?x=1&amp;y=2</loc>'), '& 要转义');
  assert.ok(xml.includes('<xhtml:link rel="alternate" hreflang="en" href="' + SITE + '/a"/>'));
  assert.throws(() => sitemapXml([{ loc: 'x' }, { loc: 'x' }]), /duplicate/);
});

test('真实的常见问题目录：每篇文章能读出语言，原文都在', () => {
  const arts = readFaqArticles();
  assert.ok(arts.length > 0);
  for (const a of arts) assert.ok(existsSync(join(ROOT, 'faq', a.slug + '.md')), a.slug + ' 缺简体原文');
});

test('脚本外置：只抽足够大的裸内联脚本，顺序不变、同内容只写一份、带属性的不动', () => {
  const big = 'var a = "<\\/script>";' + 'x'.repeat(100);
  const html = '<script src="/site.js"></script><script type="application/json">' + 'y'.repeat(200) +
    '</script><script>small()</script><script>' + big + '</script><p>t</p><script>' + big + '</script>';
  const { html: out, files } = externalizeScripts(html, 50);
  assert.equal(files.length, 1);
  assert.equal(files[0].content, big);
  assert.match(files[0].name, /^home-[0-9a-f]{16}\.js$/);
  const tag = '<script src="/assets/' + files[0].name + '"></script>';
  assert.equal(out, '<script src="/site.js"></script><script type="application/json">' + 'y'.repeat(200) +
    '</script><script>small()</script>' + tag + '<p>t</p>' + tag);
});

test('烤好的首页：两段 JSON-LD 可解析、有功能详解区的 h2/h3，链接的常见问题在该语言下都存在', () => {
  const template = read('public/index.html');
  for (const code of LANGS) {
    const html = renderHome(template, dictOf(code), code);
    const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(lds.map((o) => o['@type']), ['WebSite', 'SoftwareApplication'], code);
    assert.equal(lds[1].url, SITE + routeFor(code, '/'), code);
    const guide = /<section class="feature alt-band" id="guide">([\s\S]*?)<\/section>/.exec(html);
    assert.ok(guide, code + ' 缺功能详解区');
    assert.ok((guide[1].match(/<h3\b/g) || []).length >= 8, code + ' 功能详解区的 h3 太少');
    for (const [, href] of guide[1].matchAll(/href="(\/faq\/[^"#?]+)"/g)) {
      assert.ok(existsSync(join(ROOT, href.slice(1) + '.md')), code + ' 首页链到了不存在的文章 ' + href);
    }
  }
});

test('仓库说明文档（README / AGENTS / CLAUDE / docs/）不被构建成站点页面', () => {
  const m = /srcExclude:\s*\[([^\]]*)\]/.exec(read('.vitepress/config.mts'));
  assert.ok(m, 'config.mts 缺 srcExclude');
  for (const p of ['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/**']) assert.ok(m[1].includes("'" + p + "'"), 'srcExclude 缺 ' + p);
});

test('robots.txt 指向 sitemap', () => {
  assert.match(read('public/robots.txt'), /^Sitemap: https:\/\/fushi\.moe\/sitemap\.xml$/m);
});
