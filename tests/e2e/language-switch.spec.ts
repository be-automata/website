import { expect, test, type Page } from '@playwright/test';

const header = (page: Page) => page.locator('header');
const langSwitcher = (page: Page) => header(page).getByRole('link', { name: 'Switch language' });
const navLink = (page: Page, name: string) => header(page).getByRole('link', { name, exact: true });

test.describe('Language switcher', () => {
  test('home: ES → EN lands on /en/ and renders English nav', async ({ page }) => {
    await page.goto('/');
    await expect(langSwitcher(page)).toHaveText('EN');

    await langSwitcher(page).click();

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(navLink(page, 'Capabilities')).toBeVisible();
  });

  test('home: EN → ES lands on / and renders Spanish nav', async ({ page }) => {
    await page.goto('/en/');
    await expect(langSwitcher(page)).toHaveText('ES');

    await langSwitcher(page).click();

    await expect(page).toHaveURL(/localhost:4321\/$/);
    await expect(navLink(page, 'Capacidades')).toBeVisible();
  });

  test('capabilities: ES → EN preserves section (goes to /en/capabilities)', async ({ page }) => {
    await page.goto('/capacidades');
    await langSwitcher(page).click();
    await page.waitForLoadState('domcontentloaded');

    // User expects to stay on the "capabilities" section, just translated.
    await expect(page).toHaveURL(/\/en\/capabilities\/?$/);
    // And the page must actually render (not a 404).
    await expect(navLink(page, 'Capabilities')).toBeVisible();
  });

  test('capabilities: EN → ES preserves section (goes to /capacidades)', async ({ page }) => {
    await page.goto('/en/capabilities');
    await langSwitcher(page).click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/localhost:4321\/capacidades\/?$/);
    await expect(navLink(page, 'Capacidades')).toBeVisible();
  });

  test('cases index: ES → EN preserves section (goes to /en/cases)', async ({ page }) => {
    await page.goto('/casos');
    await langSwitcher(page).click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/\/en\/cases\/?$/);
    await expect(navLink(page, 'Cases')).toBeVisible();
  });

  test('cases index: EN → ES preserves section (goes to /casos)', async ({ page }) => {
    await page.goto('/en/cases');
    await langSwitcher(page).click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/localhost:4321\/casos\/?$/);
    await expect(navLink(page, 'Casos')).toBeVisible();
  });

  test('case study detail: ES → EN keeps the same case', async ({ page }) => {
    // Start from the ES cases index, click the first case, then switch language.
    await page.goto('/casos');
    const firstCase = page.locator('main a[href^="/casos/"]').first();
    await firstCase.click();
    await page.waitForLoadState('domcontentloaded');

    const esUrl = new URL(page.url());
    const slug = esUrl.pathname.replace(/^\/casos\//, '').replace(/\/$/, '');
    expect(slug).not.toEqual('');

    await langSwitcher(page).click();
    await page.waitForLoadState('domcontentloaded');

    // Must land on /en/cases/<same-slug> and render — not 404.
    await expect(page).toHaveURL(new RegExp(`/en/cases/${slug}/?$`));
    await expect(page.locator('main h1')).toBeVisible();
  });
});
