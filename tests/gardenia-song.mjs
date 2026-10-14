import { JSDOM } from 'jsdom';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE || '/kien-thuc/';
const html = await readFile('dist/am-nhac/co-dai-va-hoa-danh-danh/index.html', 'utf8');
const verse = `Làn gió
Thổi bay dấu yêu đi tan tành
Mà em không thể quen
Vắng bóng hình anh
Ngày sau em nghĩ
Có lẽ em chẳng yêu một người nào nữa
Nhưng nỗi cô đơn biết làm sao giờ`;
const chorus = `Cỏ dại khô dưới chân
Sao xứng với hoa dành dành đây
Mùa hạ với mùa đông
Sao có thể bên nhau phải không
Và khi anh rời đi
Em trở thành
Một người lạ từng quen biết
Em chúc cho anh
Được hạnh phúc mãi sau này
Cỏ dại khô dưới chân
Sao xứng với hoa dành dành đây
Chẳng đủ tốt để có thể
Níu giữ anh trong vòng tay
Giọt nước mắt từng rơi
Là ký ức
Vết sẹo cuộc tình đã trôi
Mai sau
Không ai đến giúp chữa lành nữa rồi`;
const expected = [verse, chorus, verse, chorus].join('\n').split('\n');
const dom = new JSDOM(html, { runScripts: 'outside-only', url: `https://example.invalid${base}am-nhac/co-dai-va-hoa-danh-danh/`, pretendToBeVisual: true });
const w = dom.window, d = w.document;
assert.deepEqual([...d.querySelectorAll('.gardenia-line')].map(el => el.textContent), expected, 'All 50 supplied lines, words, pronouns and repetitions stay exact');
assert.equal(d.querySelectorAll('.gardenia-verse').length, 4);
assert.equal(d.querySelectorAll('.gardenia-stanza').length, 12);
assert.equal(d.querySelector('.gardenia-toolbar').hidden, true, 'No-JS reader has no dead controls');
assert.equal(d.querySelector('h1').textContent, 'Cỏ Dại Và Hoa Dành Dành');
assert.equal(d.querySelectorAll('h1 br,[autofocus]').length, 0);
const iframe = d.querySelector('iframe');
assert.equal(iframe.src, 'https://www.youtube.com/embed/Zb6zrxrHv14?playsinline=1');
assert.ok(iframe.title); assert.ok(iframe.hasAttribute('allowfullscreen'));
assert.doesNotMatch(iframe.getAttribute('allow'), /autoplay/);
assert.equal(d.querySelector('.gardenia-youtube').href, 'https://www.youtube.com/watch?v=Zb6zrxrHv14');
assert.match(d.querySelector('.gardenia-youtube').rel, /noopener/);
const ids = [...d.querySelectorAll('[id]')].map(el => el.id); assert.equal(ids.length, new Set(ids).size);
for (const link of d.querySelectorAll('.toc a')) assert.ok(d.getElementById(link.hash.slice(1)));
w.matchMedia = () => ({ matches: true, addEventListener() {} });
w.IntersectionObserver = class { observe() {} };
let nextFrame = 0; const frames = new Map();
w.requestAnimationFrame = callback => { frames.set(++nextFrame, callback); return nextFrame; };
w.cancelAnimationFrame = id => frames.delete(id);
Object.defineProperty(w, 'scrollY', { value: 400, writable: true });
Object.defineProperty(w, 'innerHeight', { value: 800 });
Object.defineProperty(d.documentElement, 'scrollHeight', { value: 5000 });
w.scrollTo = options => { assert.equal(options.behavior, 'instant'); w.scrollY = Math.min(options.top, 4200); };
for (const script of d.querySelectorAll('script')) {
  const src = script.getAttribute('src');
  const code = src ? await readFile(resolve('dist', src.slice(base.length)), 'utf8') : script.textContent;
  w.eval(`(()=>{${code}\n})()`);
}
const article = d.querySelector('.gardenia-song'), button = d.querySelector('#gardenia-scroll');
const smaller = d.querySelector('#gardenia-smaller'), larger = d.querySelector('#gardenia-larger');
const playing = () => button.getAttribute('aria-pressed') === 'true';
const advance = time => { const current = [...frames.values()]; frames.clear(); current.forEach(fn => fn(time)); };
assert.equal(d.querySelector('.gardenia-toolbar').hidden, false);
assert.equal(playing(), false); assert.equal(frames.size, 0, 'Scrolling never autostarts');
for (let n = 0; n < 3; n++) {
  button.click(); assert.equal(playing(), true); const before = w.scrollY;
  advance(100); advance(180); assert.ok(w.scrollY > before);
  button.click(); assert.equal(playing(), false); assert.equal(frames.size, 0);
  button.click(); button.dispatchEvent(new w.Event('touchstart', { bubbles: true }));
  assert.equal(playing(), true, 'Touchstart must not invert the subsequent pause click');
  button.click(); assert.equal(playing(), false);
  button.click(); button.dispatchEvent(new w.KeyboardEvent('keydown', { key: ' ', bubbles: true }));
  assert.equal(playing(), true, 'Space default click must still pause');
  button.click(); assert.equal(playing(), false);
  for (const key of ['Escape', 'ArrowDown', 'PageUp', '/', ' ']) {
    button.click(); d.dispatchEvent(new w.KeyboardEvent('keydown', { key, bubbles: true })); assert.equal(playing(), false);
  }
  button.click(); w.dispatchEvent(new w.Event('wheel')); assert.equal(playing(), false);
  button.click(); article.dispatchEvent(new w.Event('touchstart', { bubbles: true })); assert.equal(playing(), false);
  button.click(); d.querySelector('#menu-toggle').click(); assert.equal(playing(), false);
  button.click(); larger.click(); assert.equal(playing(), false);
}
for (let n = 0; n < 20; n++) larger.click();
assert.equal(article.style.getPropertyValue('--gardenia-font-size'), '32px'); assert.equal(larger.disabled, true);
for (let n = 0; n < 20; n++) smaller.click();
assert.equal(article.style.getPropertyValue('--gardenia-font-size'), '18px'); assert.equal(smaller.disabled, true);
larger.click(); assert.equal(smaller.disabled, false);
w.scrollY = 4200; button.click(); advance(400); assert.equal(playing(), false, 'Autoscroll ends at page bottom');
const search = d.querySelector('#lesson-search'); search.value = 'co dai'; search.dispatchEvent(new w.Event('input'));
assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length, 1);
assert.ok(d.querySelector('[data-search]:not([hidden]) a').href.endsWith('/am-nhac/co-dai-va-hoa-danh-danh/'));
assert.equal(d.querySelectorAll('nav[aria-label="Danh mục bài học"] a').length, 22);
dom.window.close();
const css = await readFile('src/styles/gardenia-song.css', 'utf8');
assert.doesNotMatch(css, /(?:^|\})\s*(?:html|body|:root|\.sidebar|\.mobile-header|\.page-shell|\.toc)[\s{.:#]/, 'Theme stays inside the article');
console.log(`PASS gardenia song (${base}): 50 exact supplied lyric lines, repeated stanzas, official non-autoplay embed and external fallback, no-JS text, bounded font controls, manual-start scrolling, repeated touch/Space pause, wheel/menu/shortcut interruption, bottom stop, sidebar/search/TOC.`);
