const { default: axios } = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { OAuth2Client } = require('google-auth-library');
const _ = require('lodash');
const Oauth = require('../../models/oauth');
const User = require('../../models/user');
const { uniqueId } = require('../../utils/string');
const auth = require('../../utils/auth');

async function createOrFindUser(options) {
  const {
    sub, picture, name, email,
  } = options;
  let oauth = await Oauth.findBy('unionId', sub);
  if (oauth && oauth.userId) {
    return User.find(oauth.userId);
  }
  const uuid = uniqueId().slice(0, 6);
  const user = await User.create({
    nickname: name,
    avatar: picture,
    username: uuid,
    email,
    uuid,
  });
  oauth = await Oauth.create({
    openId: sub,
    unionId: sub,
    type: 2, // google
    avatar: picture,
    nickname: name,
    email,
    userId: user.id,
  });
  return user;
}

async function handleToken(req, response, next) {
  const { credential } = req.body || {};
  if (!credential) {
    return next('params error');
  }
  const client = new OAuth2Client();
  let ticket;
  try {
    if (process.env.https_proxy) {
      const httpAgent = new HttpsProxyAgent(process.env.https_proxy);
      const res = await axios.get('https://www.googleapis.com/oauth2/v1/certs', {
        httpAgent,
        httpsAgent: httpAgent,
      });
      const certs = res.data;
      ticket = await client.verifySignedJwtWithCertsAsync(
        credential,
        certs,
        process.env.GOOGLE_CLIENT_ID,
        client.issuers,
      );
    } else {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    }
    const payload = ticket.getPayload();
    const user = await createOrFindUser(payload);
    const token = auth.generate({ id: user.id, uuid: user.uuid, nickname: user.nickname });
    const expires = new Date(Date.now() + 86400000 * 30);
    response.cookie('token', token, { expires, httpOnly: true });
    return response.json({ code: 0, token, user: _.omit(user, ['password']) });
  } catch (err) {
    next(err);
  }
}

// async function testHttpAgent(req, response, next) {
//   try {
//     const res = await axios.get('https://www.googleapis.com/oauth2/v1/certs', {
//       httpAgent,
//       httpsAgent: httpAgent,
//     });
//     console.log(res.data, res.headers);

//     // const agent = new ProxyAgent();
//     // const http = new Gaxios()
//     // // http.agentCache.set(httpProxy, agent)
//     // const data = await http.request({
//     //   url: 'https://www.google.com',
//     // })

//     // const agent = new ProxyAgent();
//     // https.get('https://jsonip.com', { agent }, (res) => {
//     //   console.log(res.statusCode, res.headers, res);
//     //   // res.pipe(process.stdout);
//     //   success(response, {https_proxy: process.env.https_proxy})
//     // });

//     // console.log(data)
//     success(response, { https_proxy: process.env.https_proxy });
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = {
  handleToken,
  // testHttpAgent,
};
