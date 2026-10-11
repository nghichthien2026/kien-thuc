import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const base=process.env.TEST_BASE||'/kien-thuc/';
const html=await readFile('dist/thiet-ke/neumorphism/index.html','utf8');
for(const reduced of [false,true]){
 const dom=new JSDOM(html,{runScripts:'outside-only',url:`https://example.invalid${base}thiet-ke/neumorphism/`,pretendToBeVisual:true});
 const w=dom.window,d=w.document;w.matchMedia=q=>({matches:q.includes('prefers-reduced-motion')?reduced:false,addEventListener(){}});w.IntersectionObserver=class{observe(){}};
 for(const script of d.querySelectorAll('script')){const source=script.getAttribute('src');if(source)assert.ok(source.startsWith(`${base}_astro/`));const code=source?await readFile(`dist/${source.slice(base.length)}`,'utf8'):script.textContent;w.eval(`(()=>{${code}\n})()`);}
 const $=s=>d.querySelector(s), $$=s=>[...d.querySelectorAll(s)],click=s=>$(s).click();
 assert.equal($$('h1').length,1);assert.equal($('h1').textContent,'Neumorphism');assert.equal($$('.neo-column').length,4);assert.equal($$('.neo-kit button').length,38);
 const ids=$$('[id]').map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
 const ranges=$$('[data-neo-range]');assert.equal(ranges.length,4);
 ranges[0].value='83';ranges[0].dispatchEvent(new w.Event('input'));assert.equal($('#neo-progress-value').textContent,'83%');assert.equal($('[role="progressbar"]').getAttribute('aria-valuenow'),'83');
 click('[data-action="Next"]');assert.equal(ranges[0].value,'93');click('[data-action="Next"]');click('[data-action="Next"]');assert.equal(ranges[0].value,'100');click('[data-action="Previous"]');assert.equal(ranges[0].value,'90');click('[data-action="Clear"]');click('[data-action="Previous"]');assert.equal(ranges[0].value,'0');
 click('[data-balance="356"]');assert.equal($('#neo-balance').textContent,'$ 11,656');click('[data-balance="-117"]');assert.equal($('#neo-balance').textContent,'$ 11,539');for(let i=0;i<120;i++)click('[data-balance="-100"]');assert.equal($('#neo-balance').textContent,'$ 0');
 click('#neo-credit');click('[data-info="Add"]');assert.equal($('#neo-credits').textContent,'38');
 const first=$('[data-toggle]');click('[data-toggle]');assert.equal(first.getAttribute('aria-pressed'),'false');click('[data-toggle]');assert.equal(first.getAttribute('aria-pressed'),'true');
 click('#neo-tab-0');assert.equal($('#neo-tab-panel').getAttribute('aria-labelledby'),'neo-tab-0');$('#neo-tab-0').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}));assert.equal($('#neo-tab-2').getAttribute('aria-selected'),'true');assert.equal(d.activeElement.id,'neo-tab-2');$('#neo-tab-2').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home'}));assert.equal($('#neo-tab-0').tabIndex,0);assert.equal($$('[role="tab"][tabindex="0"]').length,1);
 click('[data-action="Menu"]');assert.equal($('.neo-select').open,true);click('[data-option="Option two"]');assert.equal($('.neo-select').open,false);assert.match($('.neo-select summary').textContent,/Option two/);assert.equal(d.activeElement,$('.neo-select summary'));
 click('#neo-open-note');assert.equal($('#neo-note').hidden,false);assert.equal($('#neo-open-note').getAttribute('aria-expanded'),'true');click('#neo-open-note');assert.equal($('#neo-note').hidden,true);
 click('#neo-glow');assert.equal($('.neo-stage').classList.contains('no-glow'),true);click('[data-info="Thông báo"]');assert.equal($('#neo-notifications').checked,true);click('[data-info="Protected"]');assert.equal($('.neo-wide[data-toggle]').getAttribute('aria-pressed'),'true');
 const dots=$$('[data-dot-row="0"]');dots[0].click();assert.equal(dots.filter(x=>x.getAttribute('aria-pressed')==='true').length,1);const avatars=$$('[data-avatar]');avatars[2].click();assert.equal(avatars[2].getAttribute('aria-pressed'),'true');
 $('#neo-search').value='volume';$('#neo-search-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal($$('.neo-found').length,1);assert.equal($('.neo-found').getAttribute('aria-label'),'Volume');$('#neo-search').value='unknown';$('#neo-search-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal($$('.neo-found').length,0);assert.match($('#neo-status').textContent,/Không tìm thấy/);
 $('#neo-text').value='Mẫu';$('#neo-text').dispatchEvent(new w.Event('input'));assert.match($('#neo-status').textContent,/chỉ lưu trong trang này/);
 click('#neo-reset');assert.equal($('#neo-balance').textContent,'$ 11,300');assert.equal($('#neo-credits').textContent,'36');assert.deepEqual(ranges.map(x=>x.value),['36','94','6','72']);assert.equal($('#neo-progress-value').textContent,'36%');assert.equal($('#neo-glow').checked,true);assert.equal($('#neo-notifications').checked,false);assert.equal($('.neo-stage').classList.contains('no-glow'),false);assert.equal($('#neo-note').hidden,true);assert.equal($('#neo-text').value,'');assert.equal($('#neo-search').value,'');assert.equal($('.neo-select').open,false);assert.equal($('.neo-accordion').open,true);assert.match($('.neo-select summary').textContent,/Lorem Ipsum/);assert.equal($('#neo-tab-1').getAttribute('aria-selected'),'true');assert.equal(avatars[0].getAttribute('aria-pressed'),'true');assert.equal(dots[1].getAttribute('aria-pressed'),'true');assert.equal(first.getAttribute('aria-pressed'),'true');click('#neo-reset');assert.match($('#neo-status').textContent,/Demo reset/);
 assert.equal($$('.neo-kit input[type="password"]').length,0);assert.equal($$('.neo-kit a[href]').length,0);assert.match($('.neo-credit').textContent,/dữ liệu mẫu/);assert.match($('.neo-chart-body').textContent,/54%/);
 dom.window.close();
}
console.log('PASS Neumorphism DOM: all interactive groups, repeated boundaries, keyboard tabs, synthetic balance floor, search states, full repeatable reset, reduced motion, accessible names and unique IDs. Real layout remains a browser check.');
