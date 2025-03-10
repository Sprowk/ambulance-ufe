import { newE2EPage } from '@stencil/core/testing';

describe('cv1am-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv1am-ambulance-wl-editor></cv1am-ambulance-wl-editor>');

    const element = await page.find('cv1am-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
