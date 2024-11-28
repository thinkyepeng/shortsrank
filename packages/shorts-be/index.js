require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { errorHandler } = require('./middleware/error');
const { setCors } = require('./middleware/cors');
const { applyAdminRouter } = require('./src/admin/controllers/router');
const { applyRouter } = require('./src/routers');

const app = express();

app.use(setCors);
app.use(express.json({ limit: '200mb' }));
app.use(cookieParser());
app.set('trust proxy', true);
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');
if (process.env.NODE_ENV === 'development') {
  app.use(process.env.STATIC_URI_SUFFIX, express.static(process.env.UPLOAD_PATH));
}

applyRouter(app); // front-end api
applyAdminRouter(app); // admin api
app.use(errorHandler); // error handling

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
