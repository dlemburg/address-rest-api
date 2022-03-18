import AddressService from '../../services/address.service';

const tryCatcher = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res);
  } catch (err) {
    next(err);
  }
};

const getAddresses = async (req, res) =>
  res.json({ data: await AddressService.findMany(req.params.addr) });

const getAddress = async (req, res) =>
  res.json({ data: await AddressService.findOne(req.params.addr) });

const createAddress = async (req, res) => res.json({ data: await AddressService.create(req.body) });

const deleteAddress = async (req, res) =>
  res.json({ data: await AddressService.remove(req.params.addr) });

export default {
  getAddresses: tryCatcher(getAddresses),
  getAddress: tryCatcher(getAddress),
  createAddress: tryCatcher(createAddress),
  deleteAddress: tryCatcher(deleteAddress),
};
