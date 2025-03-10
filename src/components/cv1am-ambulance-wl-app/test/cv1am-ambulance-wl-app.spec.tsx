import { newSpecPage } from '@stencil/core/testing';
import { Cv1amAmbulanceWlApp } from '../cv1am-ambulance-wl-app';

describe('cv1am-ambulance-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [Cv1amAmbulanceWlApp],
      html: `<cv1am-ambulance-wl-app base-path="/"></cv1am-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("cv1am-ambulance-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [Cv1amAmbulanceWlApp],
      html: `<cv1am-ambulance-wl-app base-path="/ambulance-wl/"></cv1am-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("cv1am-ambulance-wl-list");
  });
});