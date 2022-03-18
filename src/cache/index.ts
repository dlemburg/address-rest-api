import { addresses } from './addresses';

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  normalizedAddress: string;
};

export const normalize = (address: Omit<Address, 'normalizedAddress'>) =>
  `${address.line1} ${address.line2 ? address.line2 + ' ' : ''}${address.city} ${address.state} ${
    address.zip
  }`;

let addressCache = addresses.map((x) => ({
  ...x,
  normalizedAddress: normalize(x),
}));

const getAddresses = async (): Promise<Address[]> => addressCache;

const remove = async (addressStr) => {
  const nextAddresses = addressCache.filter(
    ({ normalizedAddress }) => normalizedAddress !== addressStr
  );
  const removed = addressCache.length - nextAddresses.length;

  addressCache = nextAddresses;

  return removed;
};

const create = async (address: Omit<Address, 'normalizedAddress'>) => {
  if (!address.line1 || !address.city || !address.state || !address.zip) {
    throw new Error('Address not valid!');
  }

  addressCache = [...addressCache, { ...address, normalizedAddress: normalize(address) }];

  return addressCache;
};

export default {
  getAddresses,
  remove,
  create,
};
