#!/usr/bin/env sh

# abort on errors
set -e

git pull
git add -A
git commit -m "[#14] fix: 10월 이슈 정리 수정"
git push origin master

# build
npm run docs:build
# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy with vuepress'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Kyounghwan01/blog.git master:gh-pages

cd -
