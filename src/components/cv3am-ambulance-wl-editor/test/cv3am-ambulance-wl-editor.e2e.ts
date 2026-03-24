import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-ambulance-wl-editor></cv3am-ambulance-wl-editor>');
    const element = await page.find('cv3am-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
