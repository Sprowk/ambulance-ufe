import { newSpecPage } from '@stencil/core/testing';
import { Cv3amAmbulanceWlApp } from '../cv3am-ambulance-wl-app';

describe('cv3am-ambulance-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [Cv3amAmbulanceWlApp],
      html: `<cv3am-ambulance-wl-app base-path="/"></cv3am-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("cv3am-ambulance-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [Cv3amAmbulanceWlApp],
      html: `<cv3am-ambulance-wl-app base-path="/ambulance-wl/"></cv3am-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("cv3am-ambulance-wl-list");
  });
});
