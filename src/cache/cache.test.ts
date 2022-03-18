import AddressCache, { normalize } from '.';

describe('[cache.test.ts] suite', () => {
  test('[normalize] address object converted to string', async () => {
    expect(
      normalize({
        line1: '1600 Holloway Ave',
        line2: 'Suite 10',
        city: 'San Francisco',
        state: 'CA',
        zip: '94132',
      })
    ).toBe('1600 Holloway Ave Suite 10 San Francisco CA 94132');
  });

  test('[normalize] address object converted to string (without line2)', async () => {
    expect(
      normalize({
        line1: '1600 Holloway Ave',
        city: 'San Francisco',
        state: 'CA',
        zip: '94132',
      })
    ).toBe('1600 Holloway Ave San Francisco CA 94132');
  });

  test('[remove] address should be removed from list', async () => {
    expect(await AddressCache.remove('1600 Holloway Ave Suite 10 San Francisco CA 94132')).toBe(1);
  });

  test('[create] address should add record to list', async () => {
    const addresses = await AddressCache.getAddresses();
    const result = await AddressCache.create({
      line1: '1600 Holloway Ave',
      line2: 'Suite 10',
      city: 'San Francisco',
      state: 'CA',
      zip: '94132',
    });
    expect(result.length - addresses.length).toBe(1);
    expect(result[result.length - 1].line1).toBe('1600 Holloway Ave');
  });
});
