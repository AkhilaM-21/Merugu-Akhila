import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // Wait for canvas to render
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test_start.png' });

  // Scroll down a bit
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test_scroll_1.png' });

  await browser.close();
})();
