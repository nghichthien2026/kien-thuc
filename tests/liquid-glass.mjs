import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE||'/kien-thuc/';
const html=await readFile('dist/thiet-ke/liquid-glass/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'outside-only',url:`https://example.invalid${base}thiet-ke/liquid-glass/`,pretendToBeVisual:true});
const w=dom.window,d=w.document;w.matchMedia=()=>({matches:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};
for(const script of d.querySelectorAll('script')){assert.equal(script.hasAttribute('src'),false);w.eval(`(()=>{${script.textContent}\n})()`);}
const q=id=>d.querySelector(`#${id}`),click=id=>q(id).click(),input=(id,value)=>{q(id).value=value;q(id).dispatchEvent(new w.Event('input',{bubbles:true}));};
assert.equal(d.querySelector('h1').textContent,'Liquid Glass');assert.equal(d.querySelectorAll('h1').length,1);
const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
for(const button of d.querySelectorAll('.lg-article button'))assert.ok(button.textContent.trim()||button.getAttribute('aria-label'));
for(const element of d.querySelectorAll('.lg-article input'))assert.ok(d.querySelector(`label[for="${element.id}"]`)||element.closest('label'));
assert.equal(d.querySelector('[autofocus]'),null);assert.equal(d.querySelector('.lg-feedback').getAttribute('aria-live'),'polite');
click('lg-primary');assert.ok(q('lg-primary').classList.contains('is-pressed'));click('lg-primary');assert.ok(!q('lg-primary').classList.contains('is-pressed'));
click('lg-secondary');assert.ok(q('lg-secondary').classList.contains('is-pressed'));
click('lg-add');click('lg-search-add');assert.equal(q('lg-project-label').textContent,'New project 2');
input('lg-project-search','mint');assert.equal(q('lg-project-label').textContent,'Mint Workspace');click('lg-next-project');assert.equal(q('lg-project-label').textContent,'Mint Workspace');
input('lg-project-search','no results');assert.ok(q('lg-next-project').disabled);assert.match(q('lg-feedback-text').textContent,/0 dự án/);
input('lg-project-search','');click('lg-next-project');assert.equal(q('lg-project-label').textContent,'Mint Workspace');
q('lg-workspace-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(d.activeElement.id,'lg-workspace-name');assert.equal(q('lg-workspace-title').textContent,'Workspace');
input('lg-workspace-name','<b>Demo</b>');q('lg-workspace-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(q('lg-workspace-title').textContent,'<b>Demo</b>');assert.equal(q('lg-workspace-title').children.length,0);
click('lg-rim');assert.ok(d.querySelector('.lg-board').classList.contains('lg-no-rim'));click('lg-rim');assert.ok(!d.querySelector('.lg-board').classList.contains('lg-no-rim'));
click('lg-light-toggle');assert.equal(q('lg-light-toggle').getAttribute('aria-checked'),'false');click('lg-light-toggle');assert.equal(q('lg-light-toggle').getAttribute('aria-checked'),'true');
click('lg-tabs-button');assert.equal(q('lg-tabs-button').getAttribute('aria-pressed'),'true');assert.match(q('lg-workspace-caption').textContent,/Components/);click('lg-toast-button');assert.equal(q('lg-toast-button').getAttribute('aria-pressed'),'true');
click('lg-invite-button');assert.equal(q('lg-plan-caption').textContent,'Demo plan · 5 members');click('lg-invite-button');assert.equal(q('lg-plan-caption').textContent,'Upgrade plan');click('lg-invite-button');
click('lg-reset');click('lg-reset');assert.equal(q('lg-workspace-title').textContent,'Workspace');assert.equal(q('lg-project-label').textContent,'Search projects…');assert.equal(q('lg-project-search').value,'');assert.equal(q('lg-workspace-name').value,'');assert.equal(q('lg-plan-caption').textContent,'Upgrade plan');assert.equal(q('lg-invite-button').getAttribute('aria-pressed'),'false');assert.equal(q('lg-rim').checked,true);assert.equal(q('lg-light-toggle').getAttribute('aria-checked'),'true');assert.equal(q('lg-toast-button').getAttribute('aria-pressed'),'true');assert.ok(!q('lg-secondary').classList.contains('is-pressed'));click('lg-add');assert.equal(q('lg-project-label').textContent,'New project 1');
const css=await readFile('src/styles/liquid-glass.css','utf8');assert.match(css,/backdrop-filter/);assert.match(css,/@supports not/);assert.match(css,/prefers-reduced-motion/);assert.match(css,/focus-visible/);assert.doesNotMatch(html,/https?:\/\/(?!example)/); // no external data transmission on page
w.close();console.log(`PASS Liquid Glass (${base}): semantics, repeated interactions, empty search, safe text, reset and material fallbacks. Actual layout requires browser QA.`);
