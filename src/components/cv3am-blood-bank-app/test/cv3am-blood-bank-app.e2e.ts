import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-blood-bank-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-blood-bank-app></cv3am-blood-bank-app>');
    const element = await page.find('cv3am-blood-bank-app');
    expect(element).toHaveClass('hydrated');
  });
});
