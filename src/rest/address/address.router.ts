import express from 'express';
import AddressController from './address.controller';

const router = express.Router();

router
  .get('/', AddressController.getAddresses)
  .post('/', AddressController.createAddress)
  .get('/:addr', AddressController.getAddress)
  .delete('/:addr', AddressController.deleteAddress);

export default router;
