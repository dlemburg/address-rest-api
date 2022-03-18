import AddressCache, { Address, normalize } from '../cache';

const findOne = async (addressStr) =>
  (await AddressCache.getAddresses()).find(({ normalizedAddress }) =>
    normalizedAddress.includes(addressStr)
  );

const findMany = async (addressStr) => {
  const result = await AddressCache.getAddresses();

  if (!addressStr) {
    return result;
  }

  return result.filter(({ normalizedAddress }) => normalizedAddress.includes(addressStr));
};

const create = async (body: Address) => {
  const normalizedAddress = normalize(body);
  const foundAddress = await findOne(normalizedAddress);

  console.log('normalizedAddress: ', normalizedAddress);

  if (foundAddress) throw new Error('This address already exists!');

  return AddressCache.create(body);
};

const remove = async (addressStr) => AddressCache.remove(addressStr);

export default {
  findOne,
  findMany,
  remove,
  create,
};
