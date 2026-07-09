'use strict';

/**
 * Role-Based Access Control matrix.
 *
 * Maps each route group to the roles permitted to access it.
 * Used as a reference when wiring authorize() middleware in each module's routes.js.
 *
 * Usage:
 *   const { ROLES } = require('../constants/rbac');
 *   router.get('/me', authenticate, authorize(ROLES.USER_PROFILE), handler);
 */

const CUSTOMER         = 'customer';
const RESTAURANT_OWNER = 'restaurant_owner';
const DELIVERY         = 'delivery';
const ADMIN            = 'admin';
const SELLER           = 'seller';           // generic sellers: grocery, clothing, electronics, etc.

const RBAC = {
  // Auth — public (no role restriction)
  AUTH: [],

  // User profile — any authenticated user can read/update their own profile
  USER_PROFILE: [CUSTOMER, RESTAURANT_OWNER, DELIVERY, ADMIN],

  // Addresses — customers only
  ADDRESS: [CUSTOMER],

  // Restaurant browsing — public (no auth needed)
  RESTAURANT_READ: [],

  // Restaurant management — restaurant owners only
  RESTAURANT_WRITE: [RESTAURANT_OWNER],

  // Menu management — restaurant owners only
  MENU_WRITE: [RESTAURANT_OWNER],

  // Orders — customers place/view/cancel; restaurant owners + delivery update status
  ORDER_CREATE:        [CUSTOMER],
  ORDER_READ:          [CUSTOMER],
  ORDER_CANCEL:        [CUSTOMER],
  ORDER_STATUS_UPDATE: [RESTAURANT_OWNER, DELIVERY],

  // Delivery operations — delivery agents only
  DELIVERY_OPS: [DELIVERY],

  // Payments — customers only
  PAYMENT: [CUSTOMER],

  // Notifications — any authenticated user
  NOTIFICATION: [CUSTOMER, RESTAURANT_OWNER, SELLER, DELIVERY, ADMIN],

  // Admin operations — admin only
  ADMIN_OPS: [ADMIN],

  // Grocery / multi-category store browsing — public (no auth needed)
  GROCERY_STORE_READ: [],

  // Grocery / multi-category store management — sellers only
  GROCERY_STORE_WRITE: [SELLER],

  // Grocery product management — sellers only
  GROCERY_PRODUCT_WRITE: [SELLER],
};

module.exports = { RBAC, CUSTOMER, RESTAURANT_OWNER, SELLER, DELIVERY, ADMIN };