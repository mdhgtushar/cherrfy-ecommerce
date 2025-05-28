
const ADMIN_BASE = '/manage-admin';
const ADMIN_AUTH_BASE = '/admin/auth';

 const ADMIN_PATHS = {
  BASE: ADMIN_BASE,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  ABOUT: `${ADMIN_BASE}/about`,
  ADMIN: {
    BASE: `${ADMIN_BASE}/admin`,
    LIST: `${ADMIN_BASE}/admin/adminList`,
  },
  SETTINGS: `${ADMIN_BASE}/settings`,
  PRODUCTS: {
    BASE: `${ADMIN_BASE}/products`,
    SOURCE: `${ADMIN_BASE}/products/source`,
    VIEWER: `${ADMIN_BASE}/products/productViewer`,
    EDITOR: `${ADMIN_BASE}/products/productEditor`,
    ADD: `${ADMIN_BASE}/products/addProduct`,
    ALIEXPRESS: `${ADMIN_BASE}/products/addProduct/aliexpress`,
    LIST: `${ADMIN_BASE}/products/productList`,
    EDIT: `${ADMIN_BASE}/products/editProduct/`,
  },
  ALIEXPRESS: `${ADMIN_BASE}/aliexpress`,
  USERS: `${ADMIN_BASE}/users`,
  WORKUPDATE: `${ADMIN_BASE}/workUpdate`,
  B2C: `${ADMIN_BASE}/b2c`,
  D2C: `${ADMIN_BASE}/d2c`,
  PRICING: `${ADMIN_BASE}/pricing`,
  ORDERS: `${ADMIN_BASE}/orders`,
  SHIPPING: `${ADMIN_BASE}/shipping`,
  CAMPAIGNS: `${ADMIN_BASE}/campaigns`,
  MARKETING: `${ADMIN_BASE}/marketing`,
  ANALYTICS: `${ADMIN_BASE}/analytics`,
  MEDIA: `${ADMIN_BASE}/media`,
  BACKUP: `${ADMIN_BASE}/backup`,
  AUTH: {
    BASE: ADMIN_AUTH_BASE,
    LOGIN: `${ADMIN_AUTH_BASE}/login`,
    REGISTER: `${ADMIN_AUTH_BASE}/register`,
  },
};
export default ADMIN_PATHS