import { newSpecPage } from '@stencil/core/testing';
import { Cv3amAmbulanceWlList } from '../cv3am-ambulance-wl-list';

describe('cv3am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Cv3amAmbulanceWlList],
      html: `<cv3am-ambulance-wl-list></cv3am-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <cv3am-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cv3am-ambulance-wl-list>
    `);
  });
});
