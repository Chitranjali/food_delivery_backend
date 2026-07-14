'use strict';

const { Router } = require('express');
const controller = require('./controller');
const authenticate = require('../../common/middleware/authenticate');
const authorize = require('../../common/middleware/authorize');

const router = Router();
const customerGuard = [authenticate, authorize('customer')];

// GET /api/store/get-stores
router.get(
    "/store/get-stores",
    ...customerGuard,
    controller.getStores
);

// GET /api/store/get-store/:storeId
router.get(
    "/store/get-store/:storeId",
    ...customerGuard,
    controller.getStoreDetails
)



module.exports= router;