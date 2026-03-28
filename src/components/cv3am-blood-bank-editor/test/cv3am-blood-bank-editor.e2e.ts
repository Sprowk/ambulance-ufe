import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-blood-bank-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-blood-bank-editor></cv3am-blood-bank-editor>');
    const element = await page.find('cv3am-blood-bank-editor');
    expect(element).toHaveClass('hydrated');
  });
});
