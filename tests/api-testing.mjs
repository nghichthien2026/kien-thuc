import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const html=await readFile('dist/lap-trinh/api-testing/index.html','utf8');
for(const reduced of [false,true]){
const dom=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true,url:'https://example.invalid/kien-thuc/lap-trinh/api-testing/'}),w=dom.window,d=w.document;
w.matchMedia=q=>({matches:q.includes('prefers-reduced-motion')?reduced:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};
for(const script of d.querySelectorAll('script'))w.eval(`(()=>{${script.textContent}\n})()`);
assert.equal(d.querySelector('article').lang,'en');assert.equal(d.querySelector('h1').textContent,'API Testing');assert.equal(d.querySelectorAll('.api-row').length,9);assert.equal(d.querySelectorAll('.api-diagram').length,18);
const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);assert.equal(ids.length,new Set(ids).size);
for(const row of d.querySelectorAll('.api-row')){assert.equal(row.children.length,3);assert.ok(row.querySelector('h2').textContent.includes('Testing'));for(const svg of row.querySelectorAll('svg')){assert.ok(svg.querySelector('title').textContent);assert.ok(svg.querySelector('desc').textContent);assert.ok(svg.querySelectorAll('.api-wire').length);assert.ok(svg.querySelectorAll('.api-packet').length);}}
for(const kind of ['desktop','mobile']){const s=k=>d.querySelector(`#${k} .api-diagram-${kind}`);assert.equal([...s('integration').querySelectorAll('text')].filter(t=>t.textContent==='Input Data').length,2);assert.equal([...s('load').querySelectorAll('text')].filter(t=>t.textContent==='Test Engine').length,2);assert.equal([...s('stress').querySelectorAll('text')].filter(t=>t.textContent==='Test Engine').length,2);assert.equal(s('stress').querySelectorAll('.api-packet').length,3*s('load').querySelectorAll('.api-packet').length);for(const label of ['Old App','New App'])assert.ok(s('regression').textContent.includes(label));}
assert.doesNotMatch(d.querySelector('#security .api-explanation').textContent,/all possible/);
const poster=d.querySelector('.api-poster'),button=d.querySelector('#api-motion');assert.equal(poster.dataset.paused,String(reduced));assert.equal(button.hidden,false);
for(let i=0;i<4;i++){button.click();assert.equal(poster.dataset.paused,String(i%2===0?!reduced:reduced));assert.equal(button.getAttribute('aria-pressed'),String(poster.dataset.paused==='false'));}
dom.window.close();
}
const plain=new JSDOM(html).window.document;assert.equal(plain.querySelector('#api-motion').hidden,true);assert.equal(plain.querySelector('.api-poster').dataset.paused,'true');
const css=await readFile('src/styles/api-testing.css','utf8');assert.doesNotMatch(css,/(?:^|[},\s])(?:body|\.sidebar|\.mobile-header|\.breadcrumb|\.toc|\.page-shell)\s*[.{:#]/);assert.match(css,/animation-play-state:paused!important/);assert.match(css,/prefers-reduced-motion/);
console.log('PASS API poster: 9 rows, 18 accessible responsive SVGs, branch/comparison labels, 3× stress density, unique IDs, accurate security description, repeated play/pause, reduced-motion and no-JS defaults, scoped theme.');
