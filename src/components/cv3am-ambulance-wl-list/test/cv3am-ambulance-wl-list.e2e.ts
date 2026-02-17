import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-ambulance-wl-list></cv3am-ambulance-wl-list>');

    const element = await page.find('cv3am-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
