import { newSpecPage } from '@stencil/core/testing';
import { Cv3amBloodBankEditor } from '../cv3am-blood-bank-editor';
import fetchMock from 'jest-fetch-mock';
import { BloodBag } from '../../../api/ambulance-wl';

describe('cv3am-blood-bank-editor', () => {
  const sampleBag: BloodBag = {
    id: "bag-001",
    bloodGroup: "A" as any,
    rhFactor: "positive" as any,
    collectionDate: new Date("2024-01-15T08:30:00Z"),
    volume: 450,
    status: "available" as any,
    donorId: "donor-001",
    notes: "",
  };

  let delay = async (milliseconds: number) => await new Promise<void>(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('buttons shall be of different type', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(sampleBag), { status: 200 }],
    );

    const page = await newSpecPage({
      components: [Cv3amBloodBankEditor],
      html: `<cv3am-blood-bank-editor bag-id="bag-001" blood-bank-id="centralna-banka" api-base="http://sample.test/api"></cv3am-blood-bank-editor>`,
    });

    await delay(300);
    await page.waitForChanges();

    const items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toBeGreaterThanOrEqual(1);
  });

  it('form fields render correctly', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(sampleBag), { status: 200 }],
    );

    const page = await newSpecPage({
      components: [Cv3amBloodBankEditor],
      html: `<cv3am-blood-bank-editor bag-id="bag-001" blood-bank-id="centralna-banka" api-base="http://sample.test/api"></cv3am-blood-bank-editor>`,
    });

    await delay(300);
    await page.waitForChanges();

    const selects: any = await page.root.shadowRoot.querySelectorAll("md-filled-select");
    expect(selects.length).toBeGreaterThanOrEqual(2);

    const textFields: any = await page.root.shadowRoot.querySelectorAll("md-filled-text-field");
    expect(textFields.length).toBeGreaterThanOrEqual(1);
  });
});
