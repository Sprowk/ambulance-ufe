import { newSpecPage } from '@stencil/core/testing';
import { Cv3amBloodBankApp } from '../cv3am-blood-bank-app';

describe('cv3am-blood-bank-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/bag/@new`,
      components: [Cv3amBloodBankApp],
      html: `<cv3am-blood-bank-app base-path="/"></cv3am-blood-bank-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("cv3am-blood-bank-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/blood-bank/`,
      components: [Cv3amBloodBankApp],
      html: `<cv3am-blood-bank-app base-path="/blood-bank/"></cv3am-blood-bank-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("cv3am-blood-bank-list");
  });
});
