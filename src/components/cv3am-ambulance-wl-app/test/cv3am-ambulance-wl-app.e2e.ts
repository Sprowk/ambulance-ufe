import { newE2EPage } from '@stencil/core/testing';

describe('cv3am-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv3am-ambulance-wl-app></cv3am-ambulance-wl-app>');
    const element = await page.find('cv3am-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
