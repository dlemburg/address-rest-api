import AddressRouter from './address/address.router';
import express from 'express';

const router = express.Router();

router.use('/addresses', AddressRouter);

export default router;
