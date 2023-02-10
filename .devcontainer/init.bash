#!/bin/bash

npm i
cd cdk
npm i

# install session-manager-plugin
cd /tmp
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
sudo dpkg -i session-manager-plugin.deb