import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE||'/kien-thuc/';
const source=JSON.parse(await readFile('src/data/vietnamese-singers.json','utf8'));
const expected=['Sơn Tùng M-TP','Đan Trường','Lam Trường','Đàm Vĩnh Hưng','Tuấn Hưng','Quang Dũng','Bằng Kiều','Tùng Dương','Hà Anh Tuấn','Đức Phúc','Erik','Noo Phước Thịnh','Soobin','Isaac','Trúc Nhân','Vũ.','Hoàng Dũng','Trung Quân','Thanh Lam','Hồng Nhung','Mỹ Linh','Trần Thu Hà','Mỹ Tâm','Hồ Ngọc Hà','Lệ Quyên','Thu Minh','Cẩm Ly','Phương Thanh','Đông Nhi','Bích Phương','Hoàng Thùy Linh','Văn Mai Hương','Hương Tràm','Tóc Tiên','Hòa Minzy','Orange','Phương Mỹ Chi','tlinh','Khánh Ly','Lệ Thu','Hương Lan','Giao Linh','Tuấn Vũ','Trường Vũ','Như Quỳnh','Phi Nhung','Mạnh Quỳnh','Quang Lê','Anh Thơ','Trọng Tấn','Tân Nhàn'];
assert.deepEqual(source.map(a=>a.name),expected);assert.equal(new Set(source.map(a=>a.slug)).size,51);for(const a of source){assert.equal(a.songs.length,3);assert.equal(new Set(a.songs.map(s=>s.title.toLocaleLowerCase('vi'))).size,3);assert.ok(a.intro.length>60);for(const s of a.songs){assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.title.length>0);}}
const html=await readFile('dist/am-nhac/ca-si-viet-nam/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'outside-only',url:`https://example.invalid${base}am-nhac/ca-si-viet-nam/`,pretendToBeVisual:true});const w=dom.window,d=w.document;w.matchMedia=()=>({matches:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};let network=0;w.fetch=()=>{network++;throw Error('Unexpected fetch')};
for(const script of d.querySelectorAll('script')){const src=script.getAttribute('src');const code=src?await readFile(resolve('dist',src.slice(base.length)),'utf8'):script.textContent;w.eval(`(()=>{${code}\n})()`)}
const visible=()=>[...d.querySelectorAll('[data-artist]')].filter(a=>!a.hidden);
const search=d.querySelector('#artist-search');const searchFor=q=>{search.value=q;search.dispatchEvent(new w.Event('input'))};
assert.equal(visible().length,51);assert.equal(d.querySelectorAll('.vm-songs a').length,153);assert.equal(d.querySelectorAll('nav[aria-label="Danh mục bài học"] a').length,21);assert.equal(d.querySelectorAll('h1').length,1);assert.equal(d.querySelector('h1').textContent,'Ca sĩ Việt Nam');assert.equal(d.querySelectorAll('audio,video,iframe,img,form,[autofocus]').length,0);
for(const a of d.querySelectorAll('.vm-songs a')){assert.equal(new URL(a.href).protocol,'https:');assert.equal(a.target,'_blank');assert.match(a.rel,/noopener/);assert.ok(a.textContent.trim());}
for(let i=0;i<3;i++){
for(const [group,count]of [['nam',18],['nu',20],['truyen-thong',13]]){d.querySelector(`[data-music-filter="${group}"]`).click();assert.equal(visible().length,count);assert.equal(d.querySelectorAll('[data-music-filter][aria-pressed=true]').length,1);}
d.querySelector('#artist-reset').click();assert.equal(visible().length,51);assert.equal(search.value,'');
searchFor('MY TAM');assert.equal(visible().length,1);assert.equal(visible()[0].dataset.artist,'Mỹ Tâm');
d.querySelector('[data-music-filter=nam]').click();assert.equal(visible().length,0);assert.equal(d.querySelector('#artist-empty').hidden,false);d.querySelector('[data-music-filter=nu]').click();assert.equal(visible().length,1);assert.equal(visible()[0].dataset.artist,'Mỹ Tâm');d.querySelector('[data-music-filter=all]').click();
searchFor('NOI NAY CO ANH');assert.equal(visible().length,1);assert.equal(visible()[0].dataset.artist,'Sơn Tùng M-TP');
searchFor('ĐAN TRƯỜNG');assert.equal(visible().length,1);assert.equal(visible()[0].dataset.artist,'Đan Trường');
searchFor('qqq-no-artist');assert.equal(visible().length,0);assert.equal(d.querySelector('#artist-empty').hidden,false);assert.match(d.querySelector('#artist-status').textContent,/0 ca sĩ/);
d.querySelector('.toc a[href="#nu"]').click();assert.equal(visible().length,51);assert.equal(search.value,'');assert.equal(d.querySelector('#artist-empty').hidden,true);
}
for(const a of source){searchFor(a.name);assert.ok(visible().some(c=>c.dataset.artist===a.name));}
d.querySelector('#artist-reset').click();assert.equal(visible().length,51);assert.equal(network,0);
const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);dom.window.close();
console.log(`PASS Vietnamese singers (${base}): exact 51 artists / 153 verified-source song entries, groups 18/20/13, accent-insensitive names/titles, repeated combined filter/no-result/reset, TOC restores full content, no network/media/autofocus, 21 navigation links. External availability and visual browser QA separate.`);
