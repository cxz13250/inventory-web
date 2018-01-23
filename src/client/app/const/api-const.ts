/**
 * Created by ROGK on 2017/9/15.
 */
var COMMON_PREFIX='/api';
var USER_PERFIX='/api/user';
var GOODS_PERFIX='/api/goods';
var CUSTOM_PERFIX='/api/custom';
var CATEGORY_PREFIX='/api/category';
var ACCOUNT_PREFIX='/api/account';
var PAYMENT_PREFIX='/api/payment';
var SALE_PREFIX='/api/saleOrder';
var RECEIPT_PREFIX='/api/receipt';
var PURCHASE_PREFIX='/api/purchase';
var STOCK_PREFIX='/api/stockOrder';
var STRATEGY_PREFIX='/api/strategy';
var OPERATION_PREFIX='/api/operation';
var COMPLIMENTARY_PREFIX='/api/complimentary';
var MANAGE_PREFIX='/api/manage';
var DETAIL_PREFIX='/api/detail';
export const APIS= {
  USER_API: {
    LOGIN: USER_PERFIX + '/login',
    REGISTER: USER_PERFIX + '/register',
    LIST: COMMON_PREFIX + '/users',
    GET: USER_PERFIX +'?userId={userId}',
    UPDATE: USER_PERFIX,
    DELETE: USER_PERFIX + '?userId={userId}',
  },
  GOODS_API: {
    LIST: GOODS_PERFIX,
    CREATE: GOODS_PERFIX,
    GET: COMMON_PREFIX + '/good?goodsId={goodsId}',
    DELETE: GOODS_PERFIX + '?goodsId={goodsId}',
    UPDATE: GOODS_PERFIX,
    PURCHASE: GOODS_PERFIX + '/purchase'
  },
  CUSTOM_API: {
    LIST: COMMON_PREFIX + '/customs',
    GET: CUSTOM_PERFIX + '?customId={customId}',
    CREATE: CUSTOM_PERFIX,
    DELETE: CUSTOM_PERFIX + '?customId={customId}',
    UPDATE: CUSTOM_PERFIX,
    RECEIPT: COMMON_PREFIX + '/customs/receipt',
    PURCHASE: COMMON_PREFIX + '/customs/purchase',
    SALE: COMMON_PREFIX + '/customs/sale',
  },
  CATEGORY_API: {
    LIST: COMMON_PREFIX + '/categories',
    GET: CATEGORY_PREFIX + '?categoryId={categoryId}',
    CREATE: CATEGORY_PREFIX,
    DELETE: CATEGORY_PREFIX + '?categoryId={categoryId}',
    UPDATE: CATEGORY_PREFIX,
    GOODS: COMMON_PREFIX + '/categories/goods',
    CATEGORY: COMMON_PREFIX + '/categories/category',
  },
  ACCOUNT_API: {
    LIST: COMMON_PREFIX + '/accounts',
    GET: ACCOUNT_PREFIX + '?accountId={accountId}',
    CREATE: ACCOUNT_PREFIX,
    DELETE: ACCOUNT_PREFIX + '?accountId={accountId}',
    UPDATE: ACCOUNT_PREFIX,
    RECEIPT: COMMON_PREFIX + '/accounts/receipt',
    BANK: CUSTOM_PERFIX + '/bank?bankNo={bankNo}',
  },
  PAYMENT_API: {
    LIST: COMMON_PREFIX + '/payments',
    GET: PAYMENT_PREFIX + '?number={number}',
    CREATE: PAYMENT_PREFIX,
    DELETE: PAYMENT_PREFIX + '?number={number}',
    UPDATE: PAYMENT_PREFIX,
  },
  RECEIPT_API: {
    LIST: COMMON_PREFIX + '/receipts',
    GET: RECEIPT_PREFIX + '?number={number}',
    CREATE: RECEIPT_PREFIX,
    DELETE: RECEIPT_PREFIX + '?number={number}',
    UPDATE: RECEIPT_PREFIX,
  },
  PURCHASE_API: {
    LIST: COMMON_PREFIX + '/purchases',
    GET: PURCHASE_PREFIX + '?number={number}',
    CREATE: PURCHASE_PREFIX,
    DELETE: PURCHASE_PREFIX + '?number={number}',
    UPDATE: PURCHASE_PREFIX,
  },
  SALE_API: {
    LIST: COMMON_PREFIX + '/saleOrders',
    GET: SALE_PREFIX + '?number={number}',
    CREATE: SALE_PREFIX,
    DELETE: SALE_PREFIX + '?number={number}',
    UPDATE: SALE_PREFIX,
  },
  STOCK_API: {
    LIST: COMMON_PREFIX + '/stockOrders',
    GET: STOCK_PREFIX + '?orderId={orderId}',
    CREATE: STOCK_PREFIX,
    DELETE: STOCK_PREFIX + '?orderId={orderId}',
    UPDATE: STOCK_PREFIX,
  },
  STRATEGY_API: {
    LIST: COMMON_PREFIX + '/strategies',
    GET: STRATEGY_PREFIX + '?id={id}',
    CREATE: STRATEGY_PREFIX,
    DELETE: STRATEGY_PREFIX + '?id={id}',
    UPDATE: STRATEGY_PREFIX,
  },
  OPERATION_API: {
    LIST: OPERATION_PREFIX,
  },
  COMPLIMENTARY_API: {
    LIST: COMMON_PREFIX + '/complimentaries',
    GET: COMPLIMENTARY_PREFIX + '?orderId={orderId}',
    CREATE: COMPLIMENTARY_PREFIX,
    DELETE: COMPLIMENTARY_PREFIX + '?orderId={orderId}',
    UPDATE: COMPLIMENTARY_PREFIX,
  },
  MANAGE_API: {
    INFO: MANAGE_PREFIX + '/info',
  },
  DETAIL_API: {
    GET: DETAIL_PREFIX,
  }
}
