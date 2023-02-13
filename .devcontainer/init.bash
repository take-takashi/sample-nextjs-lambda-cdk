#!/bin/bash

WORKSPACE=$PWD

npm i
cd cdk
npm i

# CodespacesのSecretから環境変数展開して.bashrcに記載
#cd ~
#echo "export AWS_ACCESS_KEY_ID=${AWS_AWS_ACCESS_KEY_ID}" >> .bashrc
#echo "export AWS_SECRET_ACCESS_KEY=${AWS_AWS_SECRET_ACCESS_KEY}" >> .bashrc
#echo "export AWS_REGION=${AWS_AWS_REGION}" >> .bashrc

# CodespacesのSecretから環境変数展開して.env.localに記載
cd $WORKSPACE
echo "" > .env.local
echo "DB_HOST=${PRD_DB_HOST}" >> .env.local
echo "DB_USER=${PRD_DB_USER}" >> .env.local
echo "DB_PASS=${PRD_DB_PASS}" >> .env.local

# install session-manager-plugin
cd /tmp
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
sudo dpkg -i session-manager-plugin.deb