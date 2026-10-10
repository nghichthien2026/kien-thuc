import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const html=await readFile('dist/lap-trinh/git-workflow/index.html','utf8');
for(const reduced of [false,true]){
 const dom=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true,url:'https://example.invalid/kien-thuc/lap-trinh/git-workflow/'}),w=dom.window,d=w.document;
 w.matchMedia=q=>({matches:q.includes('prefers-reduced-motion')?reduced:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};
 for(const script of d.querySelectorAll('script'))w.eval(`(()=>{${script.textContent}\n})()`);
 const poster=d.querySelector('.git-poster'),button=d.querySelector('#git-motion');
 assert.equal(poster.lang,'en');assert.equal(d.querySelector('h1').textContent,'Git Workflow');assert.equal(d.querySelectorAll('.git-flow').length,12);assert.equal(d.querySelectorAll('.git-lane').length,4);
 assert.equal(d.querySelectorAll('.git-flow[data-kind="compare"]').length,5);
 assert.equal(d.querySelectorAll('.git-flow[data-kind="compare"] .git-packet').length,0,'Comparisons never imply data transfer');
 assert.equal(d.querySelectorAll('.git-flow:not([data-kind="compare"]) .git-packet').length,7);
 assert.match(d.querySelector('#commit-all').textContent,/untracked files still need git add/);
 assert.match(d.querySelector('#fetch').textContent,/stay unchanged/);
 assert.match(d.querySelector('#pull').textContent,/fast-forward, merge or rebase/);
 assert.match(d.querySelector('#merge').textContent,/current branch/);
 assert.equal(poster.dataset.paused,String(reduced));assert.equal(button.hidden,false);
 for(let i=0;i<4;i++){button.click();assert.equal(poster.dataset.paused,String(i%2===0?!reduced:reduced));assert.equal(button.getAttribute('aria-pressed'),String(poster.dataset.paused==='false'));}
 const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);assert.equal(ids.length,new Set(ids).size);
 dom.window.close();
}
const plain=new JSDOM(html).window.document;assert.equal(plain.querySelector('#git-motion').hidden,true);assert.equal(plain.querySelector('.git-poster').dataset.paused,'true');
const css=await readFile('src/styles/git-workflow.css','utf8');assert.doesNotMatch(css,/(?:^|[},\s])(?:body|\.sidebar|\.mobile-header|\.breadcrumb|\.toc|\.page-shell)\s*[.{:#]/);assert.match(css,/animation-play-state:paused!important/);assert.match(css,/prefers-reduced-motion/);
console.log('PASS Git: 12 command paths, 4 lanes, five non-mutating comparisons, seven write/integration motions, accurate tracked/fetch/pull notes, English article, unique IDs, repeated pause/play, reduced-motion and no-JS defaults, scoped palette.');
