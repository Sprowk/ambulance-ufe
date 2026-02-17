import { newSpecPage } from '@stencil/core/testing';
import { Cv3amAmbulanceWlList } from '../cv3am-ambulance-wl-list';

describe('cv3am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Cv3amAmbulanceWlList],
      html: `<cv3am-ambulance-wl-list></cv3am-ambulance-wl-list>`,
    });
    const wlList = page.rootInstance as Cv3amAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);
  });
});
