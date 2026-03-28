import { newSpecPage } from '@stencil/core/testing';
import { Cv3amBloodBankList } from '../cv3am-blood-bank-list';
import { BloodBag } from '../../../api/ambulance-wl/models';
import fetchMock from 'jest-fetch-mock';

describe('cv3am-blood-bank-list', () => {

  const sampleBags: BloodBag[] = [
    {
      id: "bag-001",
      bloodGroup: "A" as any,
      rhFactor: "positive" as any,
      collectionDate: new Date("2024-01-15T08:30:00Z"),
      volume: 450,
      status: "available" as any,
      donorId: "donor-001",
    },
    {
      id: "bag-002",
      bloodGroup: "O" as any,
      rhFactor: "negative" as any,
      collectionDate: new Date("2024-01-20T14:00:00Z"),
      volume: 350,
      status: "available" as any,
      donorId: "donor-002",
    }
  ];

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders sample entries', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleBags));

    const page = await newSpecPage({
      components: [Cv3amBloodBankList],
      html: `<cv3am-blood-bank-list blood-bank-id="centralna-banka" api-base="http://test/api"></cv3am-blood-bank-list>`,
    });

    const list = page.rootInstance as Cv3amBloodBankList;
    const expectedBags = list?.bloodBags?.length;

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(expectedBags).toEqual(sampleBags.length);
    expect(items.length).toEqual(expectedBags);
  });

  it('renders error message on network issues', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    const page = await newSpecPage({
      components: [Cv3amBloodBankList],
      html: `<cv3am-blood-bank-list blood-bank-id="centralna-banka" api-base="http://test/api"></cv3am-blood-bank-list>`,
    });

    const list = page.rootInstance as Cv3amBloodBankList;
    const expectedBags = list?.bloodBags?.length;

    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(errorMessage.length).toBeGreaterThanOrEqual(1);
    expect(expectedBags).toEqual(0);
    expect(items.length).toEqual(expectedBags);
  });
});
