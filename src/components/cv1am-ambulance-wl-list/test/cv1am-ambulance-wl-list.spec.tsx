import { newSpecPage } from '@stencil/core/testing';
import { Cv1amAmbulanceWlList } from '../cv1am-ambulance-wl-list';

describe('cv1am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Cv1amAmbulanceWlList],
      html: `<cv1am-ambulance-wl-list></cv1am-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <cv1am-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cv1am-ambulance-wl-list>
    `);
  });
});
