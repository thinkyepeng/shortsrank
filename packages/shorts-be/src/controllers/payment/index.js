const { default: axios } = require('axios');
const uuid = require('uuid');
const mainModel = require('../../models/product');
const responseUtils = require('../../utils/response');
const paramUtils = require('../../utils/param');
const productModel = require('../../models/product');
const paymentModel = require('../../models/payment');
const orderModel = require('../../models/order');
const configModel = require('../../models/config');
const userModel = require('../../models/user');
const coinModel = require('../../models/coin');
const episodeModel = require('../../models/episode');
const videoModel = require('../../models/video');
const playletModel = require('../../models/playlet');

async function getPaymentInfo(req, res) {
  const where = {
    is_delete: 0,
    enabled: 1,
  };
  const products = await mainModel.getModel()
    .where(where)
    .orderBy('sort', 'asc')
    .select(...mainModel.LIST_FIELDS);
  const payments = await paymentModel.getModel()
    .where({ is_delete: 0, enabled: 1 })
    .orderBy('sort', 'asc')
    .select(...paymentModel.LIST_FIELDS);
  responseUtils.success(res, {
    products,
    productId: products[0]?.id,
    payments,
    paymentId: payments[0]?.id,
  });
}

async function getAccessToken() {
  const url = `${process.env.PAYMENT_API_URL}/v1/oauth2/token`;
  try {
    const data = await axios.post(url, 'grant_type=client_credentials', {
      auth: {
        username: process.env.PAYMENT_APP_ID,
        password: process.env.PAYMENT_APP_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    await configModel.upsert('paypal_credentials', JSON.stringify(data.data));
    return data.data.access_token;
  } catch (err) {
    return '';
  }
}

async function createPaypalOrder(token, { price }) {
  const url = `${process.env.PAYMENT_API_URL}/v2/checkout/orders`;
  try {
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: String(price),
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'EXAMPLE INC',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: process.env.PAYMENT_SUCCESS_URL,
            cancel_url: process.env.PAYMENT_CANCEL_URL,
          },
        },
      },
    };
    const data = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': uuid.v4(),
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    return null;
  }
}

async function createOrder(req, res, next) {
  const params = req.body;
  const product_id = paramUtils.getInteger(params, 'product_id');
  const payment_id = paramUtils.getInteger(params, 'payment_id');
  if (!product_id || !payment_id) {
    return next('params error');
  }
  const product = await productModel.find(product_id);
  if (!product) {
    return next('product not exist');
  }
  const payment = await paymentModel.find(payment_id);
  if (!payment) {
    return next('payment not exist');
  }
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return next('auth error');
  }
  const order = await createPaypalOrder(accessToken, { price: product.price });
  if (!order) {
    return next('creating order failed');
  }
  const out_order_number = order.id;
  const item = order.links.find((x) => x.rel === 'payer-action');
  if (!item) {
    return next('creating order failed');
  }
  const checkout_url = item.href;
  const orderPayload = {
    user_id: res.user.id,
    product_id,
    coins: product.coins,
    description: product.description,
    product_name: product.product_name,
    price: product.price,
    out_order_number,
    payment_id,
    payment: payment.payment,
    checkout_url,
  };
  const innerOrder = await orderModel.create(orderPayload);
  responseUtils.success(res, { order: innerOrder });
}

async function successCallback(req, res, next) {
  const token = paramUtils.getString(req.query, 'token');
  if (!token) {
    return next('params error');
  }
  const order = await orderModel.getModel()
    .where({ user_id: res.user.id, out_order_number: token }).select('*').first();
  if (!order) {
    return next('product not found');
  }
  // const PayerID = paramUtils.getString(req.query, 'PayerID');
  const accessToken = await getAccessToken();
  try {
    const url = `${process.env.PAYMENT_API_URL}/v2/checkout/orders/${token}/capture`;
    const data = await axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': uuid.v4(),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { status, id } = data.data;
    if (id && status === 'COMPLETED') {
      const user = await userModel.find(res.user.id);
      const before_total = user.balance;
      const after_total = before_total + order.coins;
      await userModel.getModel().where({ id: res.user.id })
        .update({ balance: user.balance + order.coins });
      await coinModel.create({
        user_id: res.user.id,
        before_total,
        after_total,
        type: 0,
        coins: order.coins,
        reason: `orderId: ${order.id}`,
      });
      await orderModel.getModel().where({ id: order.id }).update({ status: 1 });
      return responseUtils.success(res);
    }
    return next('callback error');
  } catch (err) {
    return next(err);
  }
}

async function getOrderHistory(req, res) {
  const where = {
    status: 1,
    user_id: res.user.id,
  };
  const fields = ['coins', 'product_name', 'out_order_number', 'price', 'created'];
  const data = await orderModel.getModel().where(where).orderBy('created', 'desc').select(...fields);
  responseUtils.success(res, data);
}

async function getEpisodesHistory(req, res) {
  const rows = await episodeModel.getModel().where({ user_id: res.user.id }).orderBy('video_id', 'desc').select('*');
  const videoIds = rows.map((x) => x.video_id);
  const videos = await videoModel.getModel().whereIn('id', videoIds).orderBy('id', 'desc').select('id', 'link', 'title', 'playlet_id');
  responseUtils.success(res, videos);
}

module.exports = {
  getPaymentInfo,
  successCallback,
  createOrder,
  getOrderHistory,
  getEpisodesHistory,
};
