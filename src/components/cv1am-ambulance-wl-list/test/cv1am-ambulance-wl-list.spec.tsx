import { newSpecPage } from '@stencil/core/testing';
import { Cv1amAmbulanceWlList } from '../cv1am-ambulance-wl-list';

describe('cv1am-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Cv1amAmbulanceWlList],
      html: `<cv1am-ambulance-wl-list></cv1am-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as Cv1amAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);

  });
});
