#/bin/bash
cd packages/shorts-be && pnpm build && cd -
cd packages/shorts-fe && pnpm build && cd -
cd packages/shorts-admin && pnpm build && cd -
mkdir -p ./dist/shorts-be
mkdir -p ./dist/shorts-be/deploy/nginx
mkdir -p ./dist/shorts-be/uploads
mkdir -p ./dist/shorts-be/data/ip2region
mkdir -p ./dist/shorts-fe
mkdir -p ./dist/shorts-admin

cp -R packages/shorts-be/dist dist/shorts-be/
cp -R packages/shorts-be/deploy/nginx/ssl.* ./dist/shorts-be/deploy/nginx/
cp -R packages/shorts-be/deploy/nginx/nginx.conf ./dist/shorts-be/deploy/nginx/
cp -R packages/shorts-be/data/ip2region/ip2region.xdb ./dist/shorts-be/data/ip2region/
cp -R packages/shorts-fe/dist dist/shorts-fe/
cp -R packages/shorts-admin/dist dist/shorts-admin/

cd dist && git add ./ && git status &&  git commit -m 'update' && git push && cd -