import { newSpecPage } from '@stencil/core/testing';
import { Cv1amAmbulanceWlEditor } from '../cv1am-ambulance-wl-editor';

describe('cv1am-ambulance-wl-editor', () => {
  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [Cv1amAmbulanceWlEditor],
      html: `<cv1am-ambulance-wl-editor entry-id="@new"></cv1am-ambulance-wl-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});