import { newE2EPage } from '@stencil/core/testing';

describe('cv1am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv1am-ambulance-wl-list></cv1am-ambulance-wl-list>');

    const element = await page.find('cv1am-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
