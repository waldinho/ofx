import { getRates } from '../api/getRates';
import axios from 'axios';

jest.mock('axios');

it('returns the mock data', async () => {
  axios.get.mockResolvedValue({
    data: [{
        CustomerRate: 0.5001,
        CustomerRateInverse: 1.9996000799840032,
        CustomerAmount: 5001,
        InterbankAmount: 5068.995360972321,
        DefaultFee: 15,
        Fee: 0,
        FeeFreeThreshold: 1,
        InterbankRate: 0.506899536097232,
        InverseInterbankRate: 1.9727775008422632,
        DeliveryCountry: "UK",
        DeliveryTime: 0,
        ComparisonRate: 0.4813,
        ComparisonAmount: 188,
        Message: "Sorry, min. transfer amount is AUD 250"
    }]
  });

  const data = await getRates();
  expect(data[0].CustomerRate).toBe(0.5001);
  expect(data[0].CustomerRateInverse).toBe(1.9996000799840032);
  expect(data[0].CustomerAmount).toBe(5001);
  expect(data[0].InterbankAmount).toBe(5068.995360972321);
  expect(data[0].DefaultFee).toBe(15);
  expect(data[0].Fee).toBe(0);
  expect(data[0].FeeFreeThreshold).toBe(1);
  expect(data[0].InterbankRate).toBe(0.506899536097232);
  expect(data[0].InverseInterbankRate).toBe(1.9727775008422632);
  expect(data[0].DeliveryCountry).toEqual("UK");
  expect(data[0].DeliveryTime).toBe(0);
  expect(data[0].ComparisonRate).toBe(0.4813);
  expect(data[0].ComparisonAmount).toBe(188);
  expect(data[0].Message).toEqual("Sorry, min. transfer amount is AUD 250");
});