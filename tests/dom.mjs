import { JSDOM } from 'jsdom';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE || '/kien-thuc/';
const css=await readFile('src/styles/global.css','utf8');
assert.match(css,/\.mobile-header\{[^}]*position:fixed;inset:0 0 auto 0/,'Mobile header is anchored to the viewport');
assert.match(css,/\.mobile-header #menu-toggle\{position:absolute;left:20px;right:auto;top:14px;margin:0;transform:none;transition:none/,'Menu has a stable left anchor independent of flex alignment');
assert.equal((css.match(/left:20px;right:auto;top:14px/g)||[]).length,1,'One authoritative menu anchor');

const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function load(path,mobile=false){const html=await readFile(`dist/${path}index.html`,'utf8');const dom=new JSDOM(html,{runScripts:'outside-only',url:`https://example.invalid${base}${path}`,pretendToBeVisual:true});const w=dom.window;w.matchMedia=()=>({matches:mobile,addEventListener(){}});w.IntersectionObserver=class{observe(){}};const original=w.setTimeout.bind(w);w.setTimeout=(fn)=>original(fn,1);for(const script of w.document.querySelectorAll('script')){assert.equal(script.hasAttribute('src'),false,'Update test to resolve external JS assets');w.eval(`(()=>{${script.textContent}\n})()`);}return dom;}
const paths=['', 'thiet-ke/auto-layout/', 'lich-su/viet-nam/'];
for(const path of paths){
const dom=await load(path);const d=dom.window.document;
const header=d.querySelector(".mobile-header");assert.equal(header.firstElementChild.id,"menu-toggle");assert.equal(header.querySelector(".header-slogan").textContent,"Học - Học nữa - Học mãi");
assert.equal(d.querySelectorAll('.brand,.sidebar-caption,.sidebar-bottom,.next-lesson,.page-footer,.demo-badge').length,0,'Removed decorative blocks must not return on either lesson');
assert.equal(d.querySelectorAll('nav[aria-label="Danh mục bài học"] a').length,paths.length,'All lessons remain available in navigation');
assert.equal(d.documentElement.lang,'vi');assert.equal(d.querySelectorAll('h1').length,1);
for(const element of d.querySelectorAll('a[href],link[href]')){const href=element.getAttribute('href');if(href.startsWith('https://')){assert.ok(new URL(href).hostname);continue;}if(href.startsWith('#')){assert.ok(d.getElementById(href.slice(1)),`Missing section ${href}`);continue;}assert.ok(href.startsWith(base),`Not base aware: ${href}`);let local=href.slice(base.length);if(local.endsWith('/')||local==='')local+='index.html';await access(resolve('dist',local));}
const historyLink=d.querySelector(`nav a[href='${base}lich-su/viet-nam/']`);assert.ok(historyLink);
const search=d.querySelector('#lesson-search');search.value='thiet ke';search.dispatchEvent(new dom.window.Event('input'));assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length,1);search.value='lich su';search.dispatchEvent(new dom.window.Event('input'));assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length,1);assert.equal(historyLink.closest('li').hidden,false);search.value='zzzz';search.dispatchEvent(new dom.window.Event('input'));assert.equal(d.querySelector('#search-empty').hidden,false);search.value='';search.dispatchEvent(new dom.window.Event('input'));assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length,paths.length);
if(!path){const button=d.querySelector('#simulate');button.click();assert.equal(button.disabled,true);button.click();await wait(60);assert.equal(d.querySelectorAll('.pipeline .complete').length,4);assert.equal(button.disabled,false);button.click();await wait(60);assert.match(d.querySelector('#simulation-status').textContent,/Hoàn tất/);}else if(path==='thiet-ke/auto-layout/'){d.querySelector('input[value="column"]').checked=true;d.querySelector('#gap').value='32';d.querySelector('#padding').value='40';d.querySelector('#gap').dispatchEvent(new dom.window.Event('input',{bubbles:true}));assert.equal(d.querySelector('#demo-frame').style.flexDirection,'column');assert.equal(d.querySelector('#demo-frame').style.gap,'32px');assert.match(d.querySelector('#css-output').textContent,/padding: 40px/);d.querySelector('#reset-layout').click();assert.equal(d.querySelector('#gap').value,'16');assert.equal(d.querySelector('#demo-frame').style.flexDirection,'row');}
if(path==='lich-su/viet-nam/'){assert.equal(d.querySelectorAll('.history-period').length,10);assert.equal(d.querySelectorAll('.history-period details').length,10);assert.ok(d.querySelectorAll('.history-references a').length>=5);assert.match(d.querySelector('#nho-nhanh').textContent,/1975/);assert.match(d.querySelector('#nho-nhanh').textContent,/1976/);assert.match(d.querySelector('.breadcrumb').textContent,/Dòng thời gian/);}
dom.window.close();
}
const mobile=await load('',true);const d=mobile.window.document;assert.equal(d.querySelector('#sidebar').inert,true);d.querySelector('#menu-toggle').click();assert.equal(d.querySelector('#sidebar').inert,false);assert.equal(d.activeElement.id,'menu-toggle','Opening the mobile menu must keep focus off the search input');const mobileSearch=d.querySelector('#lesson-search');mobileSearch.focus();mobileSearch.value='thiet ke';mobileSearch.dispatchEvent(new mobile.window.Event('input'));assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length,1,'Mobile search still filters while typing');mobileSearch.value='';mobileSearch.dispatchEvent(new mobile.window.Event('input'));assert.equal(d.querySelectorAll('[data-search]:not([hidden])').length,paths.length);d.dispatchEvent(new mobile.window.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.querySelector('#menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(d.activeElement.id,'menu-toggle');d.querySelector('#menu-toggle').click();d.querySelector('#nav-backdrop').click();assert.equal(d.querySelector('#sidebar').inert,true);mobile.window.close();
console.log(`PASS DOM tests (${base}): all lessons, history content, removed decorative blocks, retained lesson navigation, internal links/assets/anchors, accent-insensitive search/empty state/reset, simulation/replay, controls/reset, mobile open/Escape/backdrop. Layout and real-browser behavior NOT validated.`);

// History visuals and progressive enhancement: test the observer independently of layout.
const historyHtml=await readFile('dist/lich-su/viet-nam/index.html','utf8');
const historyData=JSON.parse(await readFile('src/data/vietnam-history.json','utf8'));
for(const reduced of [false,true]){
 const visual=new JSDOM(historyHtml,{runScripts:'outside-only',url:`https://example.invalid${base}lich-su/viet-nam/`,pretendToBeVisual:true});
 const w=visual.window, d=w.document, observers=[];
 w.matchMedia=query=>({matches:query.includes('prefers-reduced-motion')?reduced:false,addEventListener(){}});
 w.IntersectionObserver=class{constructor(callback){this.callback=callback;observers.push(this);}observe(){}};
 for(const script of d.querySelectorAll('script'))w.eval(`(()=>{${script.textContent}\n})()`);
 assert.equal(d.querySelectorAll('.history-card-glyph svg[aria-hidden="true"]').length,10);
 assert.equal(d.querySelectorAll('.history-scene svg[role="img"]').length,3);
 assert.equal(d.querySelectorAll('[data-era-link]').length,10);
 for(const svg of d.querySelectorAll('.history-scene svg')){assert.ok(svg.querySelector('title')?.textContent);assert.ok(svg.querySelector('desc')?.textContent);}
 const ids=[...d.querySelectorAll('[id]')].map(el=>el.id);assert.equal(ids.length,new Set(ids).size,'All IDs unique');
 assert.equal(d.querySelector('.history-reading').hidden,false);
 const section=d.querySelector('[data-era="9"]');
 for(const observer of observers)observer.callback([{target:section,isIntersecting:true}]);
 assert.match(d.querySelector('#history-current-era').textContent,/10 · Hội nhập/);
 assert.equal(d.querySelector('#history-progress').style.width,'100%');
 assert.equal(d.querySelectorAll('[data-era-link][aria-current="step"]').length,1);
 assert.equal(section.classList.contains('era-arrived'),!reduced);
 const first=d.querySelector('[data-era="0"]');
 for(const observer of observers)observer.callback([{target:section,isIntersecting:false},{target:first,isIntersecting:true}]);
 assert.match(d.querySelector('#history-current-era').textContent,/01 · Dựng nước/);
 for(const period of historyData.periods){for(const paragraph of period.paragraphs)assert.ok(d.documentElement.textContent.includes(paragraph),'Original article paragraph preserved');}
 for(const memory of d.querySelectorAll('.history-memory')){assert.equal(memory.open,false);memory.querySelector('summary').click();assert.equal(memory.open,true);memory.querySelector('summary').click();assert.equal(memory.open,false);}
 visual.window.close();
}
const noJs=new JSDOM(historyHtml);assert.equal(noJs.window.document.querySelector('.history-reading').hidden,true);assert.equal(noJs.window.document.querySelectorAll('.history-period').length,10);assert.equal(noJs.window.document.querySelectorAll('.history-memory').length,historyData.quickTimeline.length);noJs.window.close();
assert.match(await readFile('src/styles/history.css','utf8'),/@media\(prefers-reduced-motion:reduce\)/);
console.log('PASS history visual DOM: 10 icons, 3 accessible diagrams, unique IDs, anchors, forward/back reading position, reduced-motion/no-JS fallbacks, intact source paragraphs, repeatable native recap controls.');
