import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
const base=process.env.TEST_BASE||'/kien-thuc/';
const html=await readFile('dist/thiet-ke/neumorphism-chat/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'outside-only',url:`https://example.invalid${base}thiet-ke/neumorphism-chat/`,pretendToBeVisual:true});
const w=dom.window,d=w.document;w.matchMedia=()=>({matches:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};
let external=0;w.fetch=()=>{external++;throw Error('Unexpected network')};w.XMLHttpRequest=class{constructor(){external++;throw Error('Unexpected network')}};
for(const script of d.querySelectorAll('script')){const src=script.getAttribute('src');const code=src?await readFile(resolve('dist',src.slice(base.length)),'utf8'):script.textContent;w.eval(`(()=>{${code}\n})()`)}
const visible=()=>[...d.querySelectorAll('[data-person]')].filter(b=>!b.hidden);
assert.equal(visible().length,9);assert.equal(d.querySelectorAll('.nc-message').length,4);
assert.deepEqual([...d.querySelectorAll('.nc-message p')].map(p=>p.textContent),['Hey Sarah, did you see the latest design draft?','Yes, I did. It looks great! Just a few comments on the color palette.',"Got it. I'll check the feedback now. Thanks!","No problem. Let's sync later."]);
assert.equal(d.querySelectorAll('.nc-stage input,.nc-stage form').length,0);
const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);
for(let i=0;i<3;i++){d.querySelector('#nc-unread').click();assert.equal(visible().length,5);assert.equal(d.querySelector('#nc-sarah-messages').hidden,false);d.querySelector('#nc-mentions').click();assert.equal(visible().length,1);assert.equal(d.querySelector('#nc-chat-name').textContent,'Family Chat');assert.equal(d.querySelector('#nc-empty').hidden,false);d.querySelector('#nc-all').click();assert.equal(visible().length,9);d.querySelector('[data-person=alex]').click();assert.equal(d.querySelector('#nc-chat-name').textContent,'Alex R.');d.querySelector('#nc-reset').click();assert.equal(d.querySelector('#nc-chat-name').textContent,'Sarah K.');assert.equal(d.querySelector('#nc-empty').hidden,true);assert.equal(d.querySelector('#nc-sarah-messages').hidden,false);assert.equal(d.querySelectorAll('[data-person][aria-pressed=true]').length,1);}
const all=d.querySelector('#nc-all');all.focus();all.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(d.activeElement.id,'nc-unread');assert.equal(d.querySelector('#nc-unread').getAttribute('aria-selected'),'true');d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(d.activeElement.id,'nc-mentions');d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(d.activeElement.id,'nc-all');assert.equal(visible().length,9);assert.equal(external,0);
for(const b of d.querySelectorAll('.nc-contact')){assert.ok(b.getAttribute('aria-label'));assert.equal(b.querySelectorAll('svg').length,1)}
assert.equal(d.querySelectorAll('nav[aria-label="Danh mục bài học"] a').length,21);
dom.window.close();console.log(`PASS Neumorphism Chat (${base}): 9 fictional avatars, exact 4 source messages, repeated filters/conversation selection/reset, arrow/Home/End tab keyboard, unique SVG IDs, no runtime fetch or form, all 21 links`);

