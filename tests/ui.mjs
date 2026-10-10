import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://localhost:4321/kien-thuc/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
await mkdir('qa',{recursive:true});
try {
await page.goto(base);await page.locator('h1').waitFor();
assert.match(await page.title(),/Dev, Staging/);
assert.equal(await page.locator('nav[aria-label="Danh mục bài học"] a').count(),2);
await page.screenshot({path:'qa/dev-desktop.png',fullPage:true});
await page.keyboard.press('/');assert.equal(await page.locator('#lesson-search').evaluate(el=>el===document.activeElement),true);
await page.locator('#lesson-search').fill('thiet ke');assert.equal(await page.locator('[data-search]:visible').count(),1);
await page.locator('#lesson-search').fill('zzzz');assert.equal(await page.locator('#search-empty').isVisible(),true);
await page.locator('#lesson-search').fill('');assert.equal(await page.locator('[data-search]:visible').count(),2);
await page.locator('#simulate').click();assert.equal(await page.locator('#simulate').isDisabled(),true);
await page.waitForFunction(()=>document.querySelector('#simulation-status').textContent.includes('Hoàn tất'),null,{timeout:8000});assert.equal(await page.locator('.pipeline .complete').count(),4);
await page.locator('#simulate').click();await page.waitForFunction(()=>document.querySelector('#simulation-status').textContent.includes('Hoàn tất'),null,{timeout:8000});
await page.locator('#sidebar a[href*="auto-layout"]').click();await page.locator('#demo-frame').waitFor();
await page.screenshot({path:'qa/auto-layout-desktop.png',fullPage:true});
await page.locator('input[value="column"]').check();assert.equal(await page.locator('#demo-frame').evaluate(el=>getComputedStyle(el).flexDirection),'column');
await page.locator('#gap').fill('32');await page.locator('#padding').fill('40');assert.match(await page.locator('#css-output').textContent(),/gap: 32px; padding: 40px/);
await page.locator('#reset-layout').click();assert.equal(await page.locator('#gap').inputValue(),'16');assert.equal(await page.locator('#padding').inputValue(),'24');assert.equal(await page.locator('input[value="row"]').isChecked(),true);
await page.goBack();assert.match(await page.title(),/Dev, Staging/);await page.goForward();await page.locator('#demo-frame').waitFor();
for(const width of [320,375,390,520,760,761,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 for(const path of ['', 'thiet-ke/auto-layout/']){
  await page.goto(base+path);
  assert.equal(await page.locator('.brand,.sidebar-caption,.sidebar-bottom,.next-lesson,.page-footer,.demo-badge').count(),0,'Removed decorative blocks must stay absent');
  if(width<=760){
   const menu=await page.locator('#menu-toggle').boundingBox();
   const slogan=await page.locator('.header-slogan').boundingBox();
   assert.equal(await page.locator('.header-slogan').textContent(),'Học - Học nữa - Học mãi');
   assert.ok(menu.x<=24 && menu.width>=44 && menu.height>=44,'Menu sits left with a touch-sized target');
   assert.ok(slogan.x>=menu.x+menu.width && slogan.x+slogan.width<=width-16,'Slogan fits beside the menu');
   for(let cycle=0;cycle<3;cycle++){
    await page.locator('#menu-toggle').click();
    let box=await page.locator('#menu-toggle').boundingBox();
    assert.equal(box.x,menu.x,'Menu stays left when opened');assert.equal(box.y,menu.y);
    await page.keyboard.press('Escape');
    box=await page.locator('#menu-toggle').boundingBox();assert.equal(box.x,menu.x,'Menu stays left when closed');
   }
   await page.evaluate(()=>window.scrollTo(0,500));
   const scrolled=await page.locator('#menu-toggle').boundingBox();assert.equal(scrolled.x,menu.x);assert.equal(scrolled.y,menu.y,'Header stays fixed while scrolling');
   await page.evaluate(()=>window.scrollTo(0,0));

  }else{assert.equal(await page.locator('.mobile-header').isVisible(),false);}

  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`overflow at ${width}: ${path}`);
  if(path && width<=390){await page.locator('#gap').fill('32');await page.locator('#padding').fill('40');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`max controls overflow ${width}`);await page.locator('#reset-layout').click();}
  if(width===390)await page.screenshot({path:`qa/${path?'auto-layout':'dev'}-mobile.png`,fullPage:true});
 }
}
await page.setViewportSize({width:390,height:844});await page.goto(base);
assert.equal(await page.locator('#sidebar').evaluate(el=>el.inert),true);
await page.locator('#menu-toggle').click();assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true,'Opening the mobile menu must not focus the search input');
await page.locator('#lesson-search').click();await page.locator('#lesson-search').fill('thiet ke');assert.equal(await page.locator('[data-search]:visible').count(),1,'Mobile search still filters while typing');
await page.locator('#lesson-search').fill('');assert.equal(await page.locator('[data-search]:visible').count(),2);
await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true);
await page.locator('#menu-toggle').click();await page.locator('#sidebar a[href*="auto-layout"]').click();await page.locator('#demo-frame').waitFor();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
await page.locator('#menu-toggle').click();await page.locator('#nav-backdrop').click({position:{x:350,y:400}});assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
assert.deepEqual(errors,[]);console.log('PASS: root/subpath navigation, search, simulation/replay, history, playground/reset, six responsive widths, mobile menu, no console or network errors');
} finally { await browser.close(); }
