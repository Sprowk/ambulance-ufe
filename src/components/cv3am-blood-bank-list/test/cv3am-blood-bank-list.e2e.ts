import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-blood-bank-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-blood-bank-list></cv3am-blood-bank-list>');

    const element = await page.find('cv3am-blood-bank-list');
    expect(element).toHaveClass('hydrated');
  });
});
