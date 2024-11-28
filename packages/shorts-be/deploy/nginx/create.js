const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Handbars = require('handlebars');

dotenv.config();

function getAdminPublicPath() {
  const envFile = path.resolve(__dirname, '../../../shorts-admin/.env');
  const envStr = fs.readFileSync(envFile, 'utf8');
  const envObj = dotenv.parse(envStr);
  return envObj.PUBLIC_PATH;
}

async function main() {
  const template = fs.readFileSync(path.resolve(__dirname, 'nginx.conf.hbs'), 'utf8');
  const packagesPath = process.env.PACKAGES_PATH;
  const backendPath = path.join(packagesPath, './shorts-be/dist');
  const adminPath = path.join(packagesPath, './shorts-admin/dist');
  const frontPath = path.join(packagesPath, './shorts-fe/dist');
  const content = Handbars.compile(template)({
    domain: process.env.DEPLOY_DOMAIN,
    frontPath,
    adminPath,
    backendPath,
    sslCertificatePath: path.join(packagesPath, './shorts-be/deploy/nginx/ssl.pem'),
    sslCertificateKeyPath: path.join(packagesPath, './shorts-be/deploy/nginx/ssl.key'),
    API_PREFIX: process.env.API_PREFIX,
    STATIC_URI_SUFFIX: process.env.STATIC_URI_SUFFIX,
    UPLOAD_PATH: process.env.UPLOAD_PATH,
    SERVER_PORT: process.env.SERVER_PORT,
    ADMIN_PUBLIC_PATH: getAdminPublicPath(),
  });
  fs.writeFileSync(path.resolve(__dirname, 'nginx.conf'), content);
}

main();
// getAdminPublicPath();
