import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const page=await browser.newPage();
const paths=['lap-trinh/http-status-codes/','devops/cong-mang/','devops/cac-loai-mang/', 'lap-trinh/cau-truc-url/'];
for(const width of [320,375,390,520,760,761,768,1024,1440]){
 await page.setViewportSize({width,height:950});
 for(const path of paths){await page.goto('http://localhost:4335/kien-thuc/'+path);const r=await page.locator('h1').evaluate(el=>{const s=getComputedStyle(el),r=document.createRange();r.selectNodeContents(el);return {text:el.textContent,height:el.offsetHeight,line:parseFloat(s.lineHeight),overflow:document.documentElement.scrollWidth>innerWidth,range:r.getBoundingClientRect().width,width:el.clientWidth}});assert.equal(r.overflow,false,`${width} ${path}: overflow`);assert.ok(r.height<=r.line+2,`${width} ${path}: multiline title`);assert.ok(r.range<=r.width+2,`${width} ${path}: title overflow ${JSON.stringify(r)}`);assert.equal(await page.locator('nav[aria-label="Danh mục bài học"] a').count(),13);if(width===1440||width===390)await page.screenshot({path:`qa/${path.split('/')[1]}-${width}.png`,fullPage:true});}
}
await page.goto('http://localhost:4335/kien-thuc/lap-trinh/http-status-codes/');assert.equal(await page.locator('.status-group tbody tr').count(),17);
await page.goto('http://localhost:4335/kien-thuc/devops/cong-mang/');assert.equal(await page.locator('.ports-board tbody tr').count(),18);assert.match(await page.locator('tr').filter({hasText:'RDP'}).textContent(),/3389/);assert.doesNotMatch(await page.locator('tr').filter({hasText:'RDP'}).textContent(),/9200/);
await page.goto('http://localhost:4335/kien-thuc/devops/cac-loai-mang/');assert.equal(await page.locator('.network-card').count(),4);assert.equal(await page.locator('.network-art').count(),4);
await browser.close();console.log('PASS all three references: 9 viewport widths, single-line titles, no viewport overflow, 13 navigation links, 17 HTTP codes, 18 correct service rows, 4 illustrated network cards.');
